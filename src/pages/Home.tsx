import { useEffect, useState } from 'react';
import axios from 'axios';
import { Play, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/player/VideoPlayer';
import { API_BASE_URL, MEDIA_BASE_URL } from '../api/config';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  created_at: string;
  url: string;
}

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const videoJsOptions = {
    autoplay: true,
    muted: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://tnt-television.com/MBEGU_TV/tracks-v1a1/mono.m3u8',
      type: 'application/x-mpegURL'
    }]
  };

  useEffect(() => {
    // Fetch latest videos
    const fetchVideos = axios.get(`${API_BASE_URL}/videos.php`);
    // Fetch latest news
    const fetchNews = axios.get(`${API_BASE_URL}/news.php?limit=10`);

    Promise.all([fetchVideos, fetchNews])
      .then(([videoRes, newsRes]) => {
        setVideos(videoRes.data.slice(0, 4));
        setNews(newsRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data', err);
        setLoading(false);
      });
  }, []);

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // minutes
    if (diff < 60) return `Il y a ${diff} min`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner News Alert (Optional, very RFI) */}
      <div className="bg-red-50 border-b border-red-100 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="bg-[#E30613] text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">Alerte</span>
          <p className="text-sm font-semibold text-gray-800">
            {news.length > 0 ? news[0].title : "Suivez l'actualité en continu sur Mbegu TV."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Left Column - A LA UNE */}
          <div className="lg:w-2/3">
            <h2 className="flex items-center text-2xl font-black uppercase text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              <span className="bg-[#E30613] text-white px-3 py-1 mr-3 text-xl">À LA UNE</span>
              Le Direct
            </h2>
            
            <div className="mb-8">
              <div className="bg-black aspect-video w-full mb-4">
                <VideoPlayer options={videoJsOptions} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
                Mbegu TV En Direct : L'information en continu depuis Lubumbashi
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Suivez tous nos journaux, débats, documentaires et émissions de divertissement en temps réel.
              </p>
            </div>

            {/* Grid of articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
              {news.slice(1, 3).map((item) => (
                <Link to={`/news/${item.slug}`} key={item.id} className="group cursor-pointer">
                  <div className="relative aspect-video bg-gray-200 mb-3 overflow-hidden">
                    <img 
                      src={item.local_image ? `${MEDIA_BASE_URL}/${item.local_image}` : (item.image_url || "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80")} 
                      alt="News" 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2 bg-[#E30613] text-white text-xs font-bold px-2 py-1 uppercase">{item.category}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#E30613] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Sidebar - FIL INFO */}
          <div className="lg:w-1/3">
            <h2 className="text-xl font-black uppercase text-gray-900 mb-6 border-b-2 border-gray-900 pb-2 flex justify-between items-end">
              En Continu
              <span className="text-sm text-[#E30613] font-bold cursor-pointer hover:underline">Tout voir</span>
            </h2>

            <div className="flex flex-col">
              {loading ? (
                <div className="flex justify-center py-12">
                   <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E30613]"></div>
                </div>
              ) : news.map((item, index) => (
                <Link to={`/news/${item.slug}`} key={index} className="py-4 border-b border-gray-200 group cursor-pointer block">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-3 w-3 text-[#E30613]" />
                    <span className="text-xs font-bold text-gray-500 uppercase">{formatTimeAgo(item.published_at)}</span>
                    <span className="text-xs font-bold text-[#E30613] uppercase ml-2">{item.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#E30613] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>

            {/* Emissions VOD */}
            <h2 className="text-xl font-black uppercase text-gray-900 mt-12 mb-6 border-b-2 border-gray-900 pb-2">
              Dernières Émissions
            </h2>
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E30613]"></div>
                </div>
              ) : videos.map((video) => (
                <div key={video.id} className="flex gap-4 group cursor-pointer">
                  <div className="w-32 aspect-video bg-gray-200 relative flex-shrink-0 overflow-hidden">
                    <img src={video.thumbnail || "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=300&q=80"} alt={video.title} className="object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-bold text-[#E30613] uppercase mb-1">{video.category}</span>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#E30613] transition-colors line-clamp-2">{video.title}</h4>
                  </div>
                </div>
              ))}
              {!loading && videos.length === 0 && (
                <p className="text-sm text-gray-500 italic">Aucune émission récente.</p>
              )}
            </div>
            
            <a href="/videos" className="mt-6 flex items-center justify-center w-full py-3 border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 hover:text-[#E30613] transition-colors">
              Toutes les vidéos <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

