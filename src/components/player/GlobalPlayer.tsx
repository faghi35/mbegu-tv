import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import VideoPlayer from './VideoPlayer';
import { X, Maximize2, Play, Pause, Volume2 } from 'lucide-react';

const GlobalPlayer = () => {
  const { activeType, isPlaying, pause, resume, stop } = usePlayer();
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isDirectTVPage = location.pathname === '/direct-tv';
  const isDirectRadioPage = location.pathname === '/direct-radio';

  const radioStreamUrl = 'https://stream.zeno.fm/skc0rbglpyctv';
  const tvOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://tnt-television.com/MBEGU_TV/tracks-v1a1/mono.m3u8',
      type: 'application/x-mpegURL'
    }]
  };

  useEffect(() => {
    if (activeType === 'RADIO' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeType]);

  return (
    <>
      {/* TV MINI POPUP */}
      {activeType === 'TV' && !isDirectTVPage && (
        <div className="fixed bottom-24 md:bottom-6 right-4 z-[60] w-[280px] md:w-[320px] bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 animate-in slide-in-from-right duration-500">
          <div className="relative group">
            <div className="aspect-video w-full">
              <VideoPlayer options={tvOptions} />
            </div>
            {/* Overlay Controls */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-50 pointer-events-auto">
              <button 
                onClick={() => navigate('/direct-tv')}
                className="p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm cursor-pointer"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button 
                onClick={stop}
                className="p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-40">
                <p className="text-[10px] text-white font-bold truncate">Mbegu TV en direct</p>
            </div>
          </div>
        </div>
      )}

      {/* RADIO BOTTOM BAR */}
      {activeType === 'RADIO' && (
        <>
          {!isDirectRadioPage && (
            <div className="fixed bottom-[66px] md:bottom-0 left-0 right-0 z-[55] bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] px-4 py-3 md:py-4 animate-in slide-in-from-bottom duration-500">
              <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border border-gray-200">
                        <img src="/logo.png" alt="Mbegu FM" className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="overflow-hidden">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#E30613] rounded-full animate-pulse"></span>
                            <p className="text-[10px] md:text-xs font-bold text-[#E30613] uppercase tracking-wider">Radio en direct</p>
                        </div>
                        <h4 className="text-xs md:text-sm font-black text-gray-900 truncate uppercase">Mbegu FM : L'info du Katanga</h4>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <button 
                      onClick={isPlaying ? pause : resume}
                      className="w-10 h-10 md:w-12 md:h-12 bg-[#E30613] text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all"
                    >
                      {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                    </button>
                    <button 
                      onClick={() => navigate('/direct-radio')}
                      className="hidden md:flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={stop}
                      className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                </div>
              </div>
            </div>
          )}
          <audio ref={audioRef} src={radioStreamUrl} />
        </>
      )}
    </>
  );
};

export default GlobalPlayer;
