import { Link, useLocation } from 'react-router-dom';
import { Menu, PlayCircle, Radio, Trophy, ChevronDown, ChevronRight, Home, X, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="w-full bg-white z-50 border-b border-gray-200 sticky top-0">
      {/* Ligne 1 : Logo et Actions Hautes */}
      <div className="flex items-stretch justify-between h-[60px] md:h-[70px] max-w-[1400px] mx-auto px-4 xl:px-8 relative border-b md:border-b-0 border-gray-200">
        
        {/* MOBILE : Langue (Gauche) */}
        <div className="md:hidden flex items-center z-10">
          <div className="relative flex items-stretch">
            <button className="flex items-center text-[13px] font-bold text-gray-900 peer py-2">
              FR <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="hidden peer-hover:flex hover:flex absolute top-full left-0 w-[120px] bg-white border border-gray-200 shadow-lg flex-col z-50">
              <a href="#" className="px-4 py-3 text-[13px] font-bold hover:bg-gray-50 hover:text-[#E30613] border-b border-gray-100">FR (Français)</a>
              <a href="#" className="px-4 py-3 text-[13px] font-bold hover:bg-gray-50 hover:text-[#E30613]">EN (English)</a>
            </div>
          </div>
        </div>

        {/* Section Gauche (Desktop) / Logo Centré (Mobile) */}
        <div className="flex items-stretch absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center md:mr-6 h-full py-1">
            <img src="/logo.png" alt="Mbegu TV" className="h-[40px] md:h-full object-contain" />
          </Link>

          {/* Liens Principaux (Desktop Uniquement) */}
          <nav className="hidden lg:flex items-center space-x-6 text-[13px] font-bold text-gray-900 tracking-wide">
            <Link to="/" className="hover:text-[#E30613] transition-colors uppercase">LA UNE</Link>
            <Link to="/programs" className="flex items-center gap-2 hover:text-[#E30613] transition-colors uppercase">
              <Radio className="h-4 w-4" /> ÉMISSIONS
            </Link>
            <Link to="/direct-tv" className="flex items-center gap-2 hover:text-[#E30613] transition-colors uppercase">
              <PlayCircle className="h-4 w-4" /> DIRECT TV
            </Link>
            <Link to="/category/sport" className="flex items-center gap-2 hover:text-[#E30613] transition-colors uppercase">
              <Trophy className="h-4 w-4" /> SPORTS
            </Link>
          </nav>
        </div>

        {/* Section Droite */}
        <div className="flex items-stretch justify-end z-10">
          
          {/* MOBILE : Bouton Directs (Droite) */}
          <div className="md:hidden flex items-center">
            <Link to="/direct-tv" className="flex items-center gap-1.5 text-[12px] font-bold text-gray-900 hover:text-[#E30613] transition-colors uppercase">
              <PlayCircle className="h-5 w-5 stroke-[1.5]" /> DIRECTS
            </Link>
          </div>

          {/* DESKTOP : Bloc Direct (Gris) */}
          <div className="hidden lg:flex items-center bg-[#f5f5f5] px-6 space-x-6 border-l border-r border-gray-200">
            <Link to="/direct-tv" className="flex items-center gap-2 text-[13px] font-bold text-gray-900 hover:text-[#E30613] transition-colors uppercase group">
              <PlayCircle className="h-5 w-5 fill-black group-hover:fill-[#E30613]" /> DIRECT TV
            </Link>
            <Link to="/direct-radio" className="flex items-center gap-2 text-[13px] font-bold text-gray-900 hover:text-[#E30613] transition-colors uppercase group">
              <PlayCircle className="h-5 w-5 fill-black group-hover:fill-[#E30613]" /> DIRECT RADIO
            </Link>
          </div>

          {/* DESKTOP : Sélecteur de langue avec menu déroulant */}
          <div className="hidden md:flex relative items-stretch">
            <button className="flex items-center px-4 hover:text-[#E30613] transition-colors text-[13px] font-bold text-gray-900 peer">
              FR <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="hidden peer-hover:flex hover:flex absolute top-full left-0 w-full min-w-[100px] bg-white border border-gray-200 shadow-lg flex-col z-50">
              <a href="#" className="px-4 py-2 text-[13px] font-bold hover:bg-gray-50 hover:text-[#E30613]">FR (Français)</a>
              <a href="#" className="px-4 py-2 text-[13px] font-bold hover:bg-gray-50 hover:text-[#E30613]">EN (English)</a>
              <a href="#" className="px-4 py-2 text-[13px] font-bold hover:bg-gray-50 hover:text-[#E30613]">SW (Swahili)</a>
            </div>
          </div>

          {/* DESKTOP : Bouton Hamburger MENU */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hidden md:flex items-center gap-2 px-3 sm:px-6 hover:text-[#E30613] transition-colors text-[13px] font-bold text-gray-900 border-l border-gray-200 ml-2"
          >
            <Menu className="h-6 w-6 stroke-[1.5]" /> MENU
          </button>
        </div>
      </div>

      {/* Ligne 2 : Ligne rouge de séparation */}
      <div className="hidden md:block h-1.5 w-full bg-[#E30613]"></div>

      {/* Ligne 3 : Sous-menu Catégories */}
      <div className="border-b border-gray-300 relative">
        <div className="flex items-center h-[45px] max-w-[1400px] mx-auto px-4 xl:px-8">
          <nav className="flex items-center space-x-6 md:space-x-8 text-[12px] font-bold text-[#000000] tracking-wider uppercase overflow-x-auto no-scrollbar whitespace-nowrap w-full pr-10">
            <Link to="/category/politique" className="hover:text-[#E30613] transition-colors flex-shrink-0">POLITIQUE</Link>
            <Link to="/category/securite" className="hover:text-[#E30613] transition-colors flex-shrink-0">SÉCURITÉ</Link>
            <Link to="/category/economie" className="hover:text-[#E30613] transition-colors flex-shrink-0">ÉCONOMIE</Link>
            <Link to="/category/sport" className="hover:text-[#E30613] transition-colors flex-shrink-0">SPORT</Link>
            <Link to="/category/societe" className="hover:text-[#E30613] transition-colors flex-shrink-0">SOCIÉTÉ</Link>
            <Link to="/category/culture" className="hover:text-[#E30613] transition-colors flex-shrink-0">CULTURE</Link>
            <Link to="/category/femme" className="hover:text-[#E30613] transition-colors flex-shrink-0">FEMME</Link>
            <Link to="/category/justice" className="hover:text-[#E30613] transition-colors flex-shrink-0">JUSTICE</Link>
            <Link to="/category/sante" className="hover:text-[#E30613] transition-colors flex-shrink-0">SANTÉ</Link>
            <Link to="/category/afrique" className="hover:text-[#E30613] transition-colors flex-shrink-0">AFRIQUE</Link>
          </nav>
          
          {/* Overlay Arrow Droite */}
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white to-transparent flex items-center justify-end pr-2 md:pr-4 xl:pr-8 pointer-events-none">
            <button className="flex items-center justify-center h-7 w-7 rounded-full border border-gray-300 bg-white pointer-events-auto">
              <ChevronRight className="h-4 w-4 text-[#E30613]" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Déroulant */}
      {isMenuOpen && (
        <div className="hidden md:block bg-white border-b border-gray-200 absolute w-full shadow-xl">
          <div className="flex flex-col py-2">
            <Link to="/" className="px-6 py-3 font-bold border-b border-gray-100 hover:text-[#E30613]">LA UNE</Link>
            <Link to="/programs" className="px-6 py-3 font-bold border-b border-gray-100 hover:text-[#E30613]">ÉMISSIONS</Link>
            <Link to="/direct-tv" className="px-6 py-3 font-bold border-b border-gray-100 hover:text-[#E30613]">DIRECT TV</Link>
            <Link to="/about" className="px-6 py-3 font-bold border-b border-gray-100 hover:text-[#E30613]">À PROPOS</Link>
            <Link to="/contact" className="px-6 py-3 font-bold hover:text-[#E30613]">CONTACT</Link>
          </div>
        </div>
      )}

      {/* Barre de navigation mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col shadow-[0_-4px_10px_rgba(0,0,0,0.08)] bg-white">
        <div className="flex justify-around items-center h-[60px] pb-safe pt-1">
          <Link to="/" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/' ? 'text-[#E30613]' : 'text-gray-600 hover:text-gray-900'}`}>
            <Home className="h-5 w-5 mb-1 stroke-[2]" />
            <span className="text-[10px] font-medium">La une</span>
          </Link>
          <Link to="/programs" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/programs' ? 'text-[#E30613]' : 'text-gray-600 hover:text-gray-900'}`}>
            <Radio className="h-5 w-5 mb-1 stroke-[2]" />
            <span className="text-[10px] font-medium">Émissions</span>
          </Link>
          <Link to="/direct-tv" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/direct-tv' ? 'text-[#E30613]' : 'text-gray-600 hover:text-gray-900'}`}>
            <PlayCircle className="h-5 w-5 mb-1 stroke-[2]" />
            <span className="text-[10px] font-medium">Direct TV</span>
          </Link>
          <Link to="/category/sport" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/category/sport' ? 'text-[#E30613]' : 'text-gray-600 hover:text-gray-900'}`}>
            <Trophy className="h-5 w-5 mb-1 stroke-[2]" />
            <span className="text-[10px] font-medium">Sports</span>
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center justify-center w-full h-full ${isMenuOpen ? 'text-[#E30613]' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {isMenuOpen ? <X className="h-5 w-5 mb-1 stroke-[2]" /> : <Menu className="h-5 w-5 mb-1 stroke-[2]" />}
            <span className="text-[10px] font-medium">Menu</span>
          </button>
        </div>
        <div className="h-1.5 w-full bg-[#E30613]"></div>
      </div>

      {/* Overlay Menu Fullscreen pour Mobile */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 top-[105px] bottom-[66px] overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="bg-gray-50 p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
              En Direct
            </div>
            <div className="flex p-4 gap-4 border-b border-gray-100">
               <Link to="/direct-tv" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-[11px] font-black text-[#E30613] uppercase bg-red-50 px-3 py-3 rounded-xl flex-1 justify-center border border-red-100 shadow-sm">
                  <PlayCircle className="h-5 w-5 fill-[#E30613] text-white" /> TV DIRECT
               </Link>
               <Link to="/direct-radio" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-[11px] font-black text-gray-900 uppercase bg-gray-50 px-3 py-3 rounded-xl flex-1 justify-center border border-gray-200 shadow-sm">
                  <Radio className="h-5 w-5" /> RADIO DIRECT
               </Link>
            </div>
            
            <div className="bg-gray-50 p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
              Rubriques
            </div>
            <div className="grid grid-cols-1 divide-y divide-gray-100">
              <Link to="/category/politique" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold flex justify-between items-center text-gray-900">
                POLITIQUE <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/category/securite" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold flex justify-between items-center text-gray-900">
                SÉCURITÉ <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/category/economie" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold flex justify-between items-center text-gray-900">
                ÉCONOMIE <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/category/societe" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold flex justify-between items-center text-gray-900">
                SOCIÉTÉ <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/category/sport" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold flex justify-between items-center text-gray-900">
                SPORT <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/category/culture" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold flex justify-between items-center text-gray-900">
                CULTURE <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/category/femme" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold flex justify-between items-center text-gray-900">
                FEMME <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/category/sante" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold flex justify-between items-center text-gray-900">
                SANTÉ <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
            
            <div className="p-8 bg-gray-50 flex flex-col gap-8 mt-auto border-t border-gray-100">
               <div className="flex flex-col gap-4">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Suivez-nous</p>
                 <div className="flex flex-wrap gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900 shadow-sm"><Facebook className="h-5 w-5" /></div>
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900 shadow-sm"><Twitter className="h-5 w-5" /></div>
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900 shadow-sm"><Instagram className="h-5 w-5" /></div>
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900 shadow-sm"><Youtube className="h-5 w-5" /></div>
                 </div>
               </div>

               <div className="flex flex-col gap-4">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nos Applications</p>
                 <div className="flex gap-2">
                    <button onClick={() => setIsAppModalOpen(true)} className="bg-black text-white px-3 py-2 rounded-lg flex items-center gap-2 flex-1 shadow-md active:scale-95 transition-transform">
                      <svg viewBox="0 0 384 512" className="h-5 w-5 fill-white flex-shrink-0">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                      </svg>
                      <div className="text-[8px] font-bold leading-tight text-left">App Store</div>
                    </button>
                    <button onClick={() => setIsAppModalOpen(true)} className="bg-black text-white px-3 py-2 rounded-lg flex items-center gap-2 flex-1 shadow-md active:scale-95 transition-transform">
                      <svg viewBox="0 0 512 512" className="h-5 w-5 fill-white flex-shrink-0">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                      </svg>
                      <div className="text-[8px] font-bold leading-tight text-left">Google Play</div>
                    </button>
                 </div>
               </div>

               <div className="text-[11px] text-gray-400 font-medium text-center border-t border-gray-100 pt-8 italic">
                 © 2026 Mbegu TV — Tous droits réservés
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 'En cours de développement' */}
      {isAppModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAppModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl text-center transform animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-[#E30613] rounded-full flex items-center justify-center mx-auto mb-6">
               <PlayCircle className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Bientôt disponible !</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Nos applications mobiles sont actuellement en cours de développement pour vous offrir la meilleure expérience possible. 
              <br/><br/>
              <b>Patience, l'information arrive !</b>
            </p>
            <button 
              onClick={() => setIsAppModalOpen(false)}
              className="w-full py-4 bg-[#E30613] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
