import { useState } from 'react';
import axios from 'axios';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    axios.post('/api/contact.php', formData)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-l-4 border-[#E30613] pl-4">Contactez-nous</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Nos Coordonnées</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-[#E30613]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Adresse</h4>
                  <p className="text-gray-600 mt-1">123 Avenue de l'Indépendance<br />Lubumbashi, Haut-Katanga<br />RDC</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-[#E30613]">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Téléphone</h4>
                  <p className="text-gray-600 mt-1">+243 00 000 0000<br />+243 00 000 0001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-[#E30613]">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">contact@mbegutv.cd<br />redaction@mbegutv.cd</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
            
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E30613] text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E30613] transition-colors disabled:opacity-70"
              >
                {status === 'loading' ? 'Envoi en cours...' : (
                  <>Envoyer le message <Send className="h-5 w-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
