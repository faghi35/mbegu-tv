import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, ChevronRight, Hash } from 'lucide-react';
import { API_BASE_URL, MEDIA_BASE_URL } from '../api/config';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  local_image: string;
  category: string;
  published_at: string;
}

const Tag = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/news.php?tag=${tagSlug}&limit=25`)
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tag news', err);
        setLoading(false);
      });
  }, [tagSlug]);

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (diff < 60) return `Il y a ${diff} min`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-gray-200 pb-8 gap-4">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Hash className="h-8 w-8" />
           </div>
           <div>
              <p className="text-[10px] font-black text-[#E30613] uppercase tracking-[0.2em] mb-1">Mot-clé</p>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
                {tagSlug?.replace(/-/g, ' ')}
              </h1>
           </div>
        </div>
        <span className="text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100 self-start md:self-center">
          {news.length} Résultats
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E30613]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link 
              key={item.id} 
              to={`/news/${item.slug}`} 
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={item.local_image ? `${MEDIA_BASE_URL}/${item.local_image}` : (item.image_url || "https://images.unsplash.com/photo-1504711432869-efd597cdd042?w=800&q=80")} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#E30613] text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest">
                  {item.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold uppercase">{formatTimeAgo(item.published_at)}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#E30613] transition-colors line-clamp-3 leading-tight mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {item.description}
                </p>
                <div className="flex items-center text-[#E30613] font-bold text-xs uppercase tracking-widest mt-auto">
                  Lire l'article <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {!loading && news.length === 0 && (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun article trouvé</h3>
          <p className="text-gray-500">Il n'y a pas encore d'actualités liées à ce mot-clé.</p>
          <Link to="/" className="inline-block mt-6 text-[#E30613] font-bold hover:underline uppercase text-xs tracking-widest">Retour à l'accueil</Link>
        </div>
      )}
    </div>
  );
};

export default Tag;
