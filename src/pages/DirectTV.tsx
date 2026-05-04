import { useEffect, useState } from 'react';
import VideoPlayer from '../components/player/VideoPlayer';
import { Share2, MessageSquare, Clock } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface Program {
  id: number;
  title: string;
  time_slot: string;
  description: string;
}

const DirectTV = () => {
  const [schedule, setSchedule] = useState<Program[]>([]);
  const { playTV } = usePlayer();

  useEffect(() => {
    fetchPrograms();
    playTV(); // Signal that TV is active
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs.php?type=TV');
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching TV programs:", error);
    }
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://tnt-television.com/MBEGU_TV/tracks-v1a1/mono.m3u8',
      type: 'application/x-mpegURL'
    }]
  };

  return (
    <div className="bg-gray-900 min-h-screen pb-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
          {/* Main Player Area */}
          <div className="lg:flex-grow">
            <div className="bg-black aspect-video w-full shadow-2xl">
              <VideoPlayer options={videoJsOptions} />
            </div>
            
            <div className="p-4 lg:px-8 lg:py-6 bg-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="text-red-600 font-bold text-sm uppercase tracking-wider">En Direct</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Mbegu TV : INFOS & MAGS | Tous les jours — direct
                  </h1>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors">
                    <Share2 className="h-5 w-5" /> Partager
                  </button>
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#E30613]" /> À propos de ce direct
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Suivez en temps réel toutes les émissions de Mbegu TV. De l'information à la culture, 
                  en passant par le sport et le divertissement, ne manquez rien de l'actualité du Katanga 
                  et de la République Démocratique du Congo.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Prochainement */}
          <div className="lg:w-[400px] bg-white border-l border-gray-200 flex flex-col h-auto lg:h-[calc(100vh-140px)]">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#E30613]" /> À suivre
              </h2>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {schedule.length > 0 ? schedule.map((item, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                  <div className="text-[#E30613] font-bold text-lg leading-tight w-16 flex-shrink-0">
                    {item.time_slot || '--:--'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-1 uppercase">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 text-gray-400 italic text-sm">
                  Grille indisponible pour le moment
                </div>
              )}
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectTV;
