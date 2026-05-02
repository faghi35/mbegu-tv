import { Tv, Globe, Users, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">À propos de Mbegu TV</h1>
        <p className="text-xl text-gray-600">
          La première chaîne d'information, de culture et de divertissement basée à Lubumbashi,
          connectant le Haut-Katanga au reste du monde.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80" 
            alt="Studio Mbegu TV" 
            className="rounded-2xl shadow-xl w-full object-cover aspect-video"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-[#E30613] pl-4">Notre Histoire</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Fondée avec la vision d'offrir une plateforme médiatique de qualité, Mbegu TV s'est 
            rapidement imposée comme un acteur incontournable du paysage audiovisuel congolais.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Notre nom, "Mbegu", qui signifie "Graine" en Swahili, reflète notre engagement à 
            semer l'information juste, cultiver les talents locaux et faire grandir notre communauté.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          { icon: <Tv className="h-8 w-8" />, title: "Qualité", desc: "Des programmes produits selon les standards internationaux." },
          { icon: <Globe className="h-8 w-8" />, title: "Proximité", desc: "Au plus près des réalités de notre public." },
          { icon: <Target className="h-8 w-8" />, title: "Objectivité", desc: "Une information neutre, vérifiée et impartiale." },
          { icon: <Users className="h-8 w-8" />, title: "Diversité", desc: "Une programmation qui reflète toute notre richesse culturelle." },
        ].map((val, idx) => (
          <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-[#E30613] mb-6">
              {val.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
            <p className="text-gray-600">{val.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
