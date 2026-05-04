import { useEffect, useState } from 'react';
import { Play, Pause, Volume2, Share2, ChevronRight, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface Program {
  id: number;
  title: string;
  time_slot: string;
  description: string;
  image_url: string;
}

const DirectRadio = () => {
  const { isPlaying, playRadio, pause, resume } = usePlayer();
  const [volume, setVolume] = useState(80);
  const [schedule, setSchedule] = useState<Program[]>([]);

  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff';
    fetchPrograms();
    playRadio(); // Set radio as active stream
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs.php?type=RADIO');
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching radio programs:", error);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    // In a real app, we'd pass this volume to the GlobalPlayer via context
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 md:pb-0">
      {/* Player Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col items-center">
            
            {/* Live Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E30613] text-[#E30613] font-bold text-[10px] uppercase tracking-widest mb-6 shadow-sm">
              <span className="w-2 h-2 bg-[#E30613] rounded-full animate-pulse"></span>
              En Direct
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-3xl">
              {/* Cover Image */}
              <div className="w-48 h-48 md:w-72 md:h-72 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex-shrink-0 relative group">
                <img src="/logo.png" alt="Mbegu FM" className="w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-500" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <div className="flex gap-1 items-end h-8">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="w-1.5 bg-[#E30613] rounded-full animate-bounce" style={{ animationDelay: `${i*0.2}s`, height: `${Math.random()*100}%` }}></div>
                       ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Controls */}
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter leading-tight uppercase text-gray-900">
                  Mbegu FM en direct
                </h1>
                <p className="text-gray-500 font-medium mb-8 text-sm md:text-base">
                  L'information et la culture du Katanga en temps réel
                </p>

                <div className="flex flex-col gap-6">
                  <button 
                    onClick={togglePlay}
                    className="flex items-center justify-center gap-4 bg-[#E30613] hover:bg-red-700 text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95"
                  >
                    {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-1" />}
                    <span>{isPlaying ? 'Arrêter le direct' : 'Écouter le direct'}</span>
                  </button>

                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <Volume2 className="h-5 w-5 text-gray-400" />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume}
                      onChange={handleVolumeChange}
                      className="flex-grow accent-[#E30613] h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer"
                    />
                    <button className="text-gray-400 hover:text-gray-900 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10 border-b-2 border-gray-100 pb-4">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">
            Grille des programmes
          </h2>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">Mise à jour réelle</span>
        </div>

        <div className="space-y-4">
          {schedule.length > 0 ? schedule.map((item, i) => (
            <div key={i} className={`flex gap-4 p-3 md:p-4 rounded-2xl transition-all border bg-white border-transparent hover:border-gray-100`}>
              <div className="flex flex-col items-center justify-center w-16 md:w-20 flex-shrink-0 border-r border-gray-100">
                <span className={`text-sm md:text-base font-black text-gray-900`}>
                  {item.time_slot || '--:--'}
                </span>
                <span className="text-[9px] font-bold text-gray-400 uppercase">Émission</span>
              </div>
              
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm flex items-center justify-center">
                {item.image_url ? (
                   <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                   <Music className="h-8 w-8 text-gray-300" />
                )}
              </div>

              <div className="flex-grow flex flex-col justify-center">
                <h3 className={`text-sm md:text-lg font-black leading-tight mb-0.5 uppercase tracking-tight text-gray-900`}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 font-medium line-clamp-1">{item.description}</p>
              </div>

              <div className="flex items-center px-2">
                <ChevronRight className={`h-5 w-5 text-gray-300`} />
              </div>
            </div>
          )) : (
            <div className="text-center py-20 text-gray-400 italic">
              Chargement de la grille des programmes...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectRadio;
