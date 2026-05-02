import { Link } from 'react-router-dom';
import { ChevronDown, Facebook, Twitter, Instagram, Youtube, MessageCircle, Send, Music } from 'lucide-react';

const Footer = () => {
  const actualiteTags = [
    'RDC', 'Katanga', 'Économie', 'Élections', 'Lubumbashi'
  ];

  const legalLinks = [
    'Mentions légales', 'Accessibilité : partiellement conforme', 'Confidentialité', 'Cookies', 'Gérer mes consentements', 'Notifications'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="h-4 w-4" /> },
    { name: 'X (Twitter)', icon: <Twitter className="h-4 w-4" /> },
    { name: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
    { name: 'YouTube', icon: <Youtube className="h-4 w-4" /> },
    { name: 'TikTok', icon: <Music className="h-4 w-4" /> },
    { name: 'WhatsApp', icon: <MessageCircle className="h-4 w-4" /> },
    { name: 'Telegram', icon: <Send className="h-4 w-4" /> },
  ];

  return (
    <footer className="hidden md:block bg-[#111111] text-white border-t-[8px] border-[#E30613] mt-12 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 xl:px-8 py-16">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Actualité */}
          <div>
            <h3 className="font-bold text-[15px] tracking-wide mb-6 uppercase">DANS L'ACTUALITÉ</h3>
            <div className="flex flex-wrap gap-3 mb-10">
              {actualiteTags.map(tag => (
                <Link 
                  key={tag} 
                  to="#" 
                  className="px-3 py-1 border border-gray-600 rounded text-sm text-gray-300 hover:text-white hover:border-white transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between cursor-pointer group">
              <h3 className="font-bold text-[15px] tracking-wide uppercase group-hover:text-gray-300 transition-colors">
                À L'INTERNATIONAL
              </h3>
              <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Column 2: À propos */}
          <div>
            <div className="flex items-center justify-between cursor-pointer group">
              <h3 className="font-bold text-[15px] tracking-wide uppercase group-hover:text-gray-300 transition-colors">
                À PROPOS DE MBEGU TV
              </h3>
              <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            </div>
            
            {/* Hidden by default in RFI but let's leave it as a dropdown trigger for styling */}
          </div>

          {/* Column 3: Partenaires */}
          <div>
            <div className="flex items-center justify-between cursor-pointer group mb-4">
              <h3 className="font-bold text-[15px] tracking-wide uppercase group-hover:text-gray-300 transition-colors">
                NOS PARTENAIRES
              </h3>
              <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Column 4: Services & Apps */}
          <div>
            <h3 className="font-bold text-[15px] tracking-wide mb-6 uppercase">SERVICES</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Link to="#" className="text-sm font-bold hover:underline">Newsletters</Link>
              <Link to="#" className="text-sm font-bold hover:underline">Flux RSS</Link>
              <Link to="/contact" className="col-span-2 text-sm font-bold hover:underline mt-2">Comment capter Mbegu TV ?</Link>
            </div>

            <h3 className="font-bold text-[15px] tracking-wide mb-6 uppercase">APPLICATIONS</h3>
            <p className="text-sm font-bold mb-4">
              Télécharger Mbegu TV sur mobile et tablette
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {/* Apple Store Button */}
              <a href="#" className="flex items-center justify-center gap-2 px-4 py-2 bg-black border border-gray-600 rounded-lg hover:border-white hover:bg-gray-900 transition-all">
                <svg viewBox="0 0 384 512" className="h-6 w-6 fill-white">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] leading-tight">Télécharger dans</div>
                  <div className="text-sm font-bold leading-tight">l'App Store</div>
                </div>
              </a>

              {/* Google Play Button */}
              <a href="#" className="flex items-center justify-center gap-2 px-4 py-2 bg-black border border-gray-600 rounded-lg hover:border-white hover:bg-gray-900 transition-all">
                <svg viewBox="0 0 512 512" className="h-6 w-6 fill-white">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] leading-tight">DISPONIBLE SUR</div>
                  <div className="text-sm font-bold leading-tight">Google Play</div>
                </div>
              </a>
            </div>

            {/* Channels / Networks logos */}
            <div className="flex items-center gap-4">
              <div className="bg-[#E30613] text-white p-2 font-black text-xl tracking-tighter leading-none w-16 text-center">
                MBEGU
              </div>
              <div className="bg-blue-600 text-white p-2 font-black text-xs tracking-tighter leading-none w-16 text-center">
                RADIO
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
          {legalLinks.map((link, idx) => (
            <Link 
              key={idx} 
              to="#" 
              className="text-[13px] font-bold text-gray-100 hover:text-white hover:underline transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
          {socialLinks.map((social, idx) => (
            <a 
              key={idx}
              href="#" 
              className="flex items-center gap-2 text-sm font-bold text-gray-100 hover:text-white transition-colors"
            >
              {social.icon}
              {social.name}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
