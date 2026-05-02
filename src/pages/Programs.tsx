import { useEffect, useState } from 'react';
import { PlayCircle, ChevronRight, Info } from 'lucide-react';
import API_BASE_URL from '../api/config';

interface Emission {
  id: number;
  title: string;
  description: string;
  image_url: string;
  source_url: string;
  category: string;
}

const Programs = () => {
  const [emissions, setEmissions] = useState<Emission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmissions();
  }, []);

  const fetchEmissions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions.php`);
      const data = await response.json();
      setEmissions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching emissions', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-2">
              Nos Émissions
            </h1>
            <p className="text-gray-500 font-medium text-lg italic">
              Découvrez la richesse de la programmation de Mbegu TV
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-bold shadow-sm">
            <span className="w-2 h-2 bg-[#E30613] rounded-full"></span>
            {emissions.length} Émissions disponibles
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E30613]"></div>
            <p className="text-gray-400 font-bold animate-pulse">Récupération du catalogue...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {emissions.map((emission) => (
              <div 
                key={emission.id} 
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden">
                  {emission.image_url ? (
                    <img 
                      src={emission.image_url} 
                      alt={emission.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-gray-200" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button className="bg-white text-[#E30613] font-bold px-4 py-2 rounded-full flex items-center gap-2 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Voir les replays <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  {emission.category && (
                    <span className="absolute top-4 left-4 bg-[#E30613] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {emission.category}
                    </span>
                  )}
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight group-hover:text-[#E30613] transition-colors leading-tight">
                    {emission.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed font-medium">
                    {emission.description || "Aucune description disponible pour le moment."}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Info className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Magazine TV</span>
                    </div>
                    <button className="text-[#E30613] font-black text-[11px] uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && emissions.length === 0 && (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100">
            <PlayCircle className="h-16 w-16 text-gray-100 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Catalogue vide</h2>
            <p className="text-gray-500">Le script de récupération n'a pas encore importé les émissions du site officiel.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
