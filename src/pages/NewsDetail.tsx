import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Share2, ArrowLeft, Bookmark } from 'lucide-react';
import { API_BASE_URL, MEDIA_BASE_URL } from '../api/config';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  local_image: string;
  category: string;
  published_at: string;
  tags?: { name: string, slug: string }[];
}

const NewsDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news_detail.php?slug=${slug}`);
      const data = await response.json();
      setArticle(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E30613]"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
        <Link to="/" className="text-[#E30613] font-bold hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  const imageUrl = article.local_image 
    ? `${MEDIA_BASE_URL}/${article.local_image}` 
    : (article.image_url || "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=1200&q=80");

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Top Navigation Strip */}
      <div className="border-b border-gray-100 bg-white sticky top-[110px] md:top-[120px] z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Retour
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-900 transition-colors"><Share2 className="h-5 w-5" /></button>
            <button className="text-gray-400 hover:text-gray-900 transition-colors"><Bookmark className="h-5 w-5" /></button>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 mt-8 md:mt-12">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-[#E30613] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
              <Calendar className="h-3 w-3" />
              {new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-ubuntu font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-gray-100">
            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
              <img src="/logo.png" alt="Mbegu TV" className="w-full h-full object-contain p-2" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900 uppercase">La Rédaction</p>
              <p className="text-xs text-gray-400 font-medium italic">Mbegu TV — Lubumbashi</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <figure className="mb-12 -mx-4 md:mx-0">
          <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 md:rounded-3xl shadow-lg border border-gray-100">
            <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
          <figcaption className="mt-4 px-4 md:px-0 text-xs text-gray-400 font-medium text-center">
            Source : Mbegu TV / Archives
          </figcaption>
        </figure>

        {/* Content Body */}
        <div className="article-content max-w-2xl mx-auto">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p className="italic text-gray-500 text-center py-10 bg-gray-50 rounded-2xl border border-gray-100">
              Le contenu complet de cet article est en cours de traitement...
            </p>
          )}
        </div>

        {/* Tags Section */}
        {article.tags && article.tags.length > 0 && (
          <div className="max-w-2xl mx-auto mt-12 pt-8 border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Mots-clés</p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <Link 
                  key={idx} 
                  to={`/tag/${tag.slug}`}
                  className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-gray-100 hover:border-[#E30613] hover:text-[#E30613] transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}


      </article>

      {/* Recommended Section (Simple) */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
         <h2 className="text-2xl font-black uppercase text-gray-900 mb-8 border-b-2 border-gray-900 pb-2">À lire aussi</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* On pourrait fetcher des recommandations ici */}
         </div>
      </div>
    </div>
  );
};

export default NewsDetail;
