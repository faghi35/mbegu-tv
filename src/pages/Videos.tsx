import { useEffect, useState } from 'react';
import axios from 'axios';
import { Play, X, Calendar, Tag } from 'lucide-react';
import VideoPlayer from '../components/player/VideoPlayer';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  created_at: string;
  url: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    axios.get('/api/videos.php')
      .then(res => {
        setVideos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching videos', err);
        setLoading(false);
      });
  }, []);

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-l-4 border-[#E30613] pl-4">Vidéos à la demande</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E30613]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <div 
              key={video.id} 
              onClick={() => openVideo(video)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="relative aspect-video bg-gray-200">
                <img src={video.thumbnail || "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=600&q=80"} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                  <div className="bg-[#E30613] p-3 rounded-full text-white">
                    <Play className="h-6 w-6 ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-[#E30613] uppercase tracking-wider">{video.category}</span>
                <h3 className="font-bold text-gray-900 mt-1 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-2">Ajouté le {new Date(video.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          {videos.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucune vidéo disponible pour le moment.
            </div>
          )}
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="bg-black aspect-video w-full">
              <VideoPlayer 
                options={{
                  autoplay: true,
                  controls: true,
                  responsive: true,
                  fluid: true,
                  sources: [{
                    src: selectedVideo.url === '#' ? 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' : selectedVideo.url,
                    type: 'application/x-mpegURL'
                  }]
                }} 
              />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-[#E30613] text-xs font-bold rounded-full uppercase tracking-wider">
                  <Tag className="h-3 w-3" /> {selectedVideo.category}
                </span>
                <span className="inline-flex items-center gap-1 text-gray-500 text-xs font-medium uppercase">
                  <Calendar className="h-3 w-3" /> {new Date(selectedVideo.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{selectedVideo.title}</h2>
              <p className="text-gray-600 leading-relaxed">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;

