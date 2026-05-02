// Configuration de l'API et des Médias
const IS_PROD = import.meta.env.PROD;

// URL de base pour les appels API
export const API_BASE_URL = IS_PROD 
    ? 'https://mbegu-tv.forka.org/api' 
    : '/api'; // Proxy Vite en développement

// URL de base pour les médias (images locales)
export const MEDIA_BASE_URL = IS_PROD
    ? 'https://mbegu-tv.forka.org' 
    : `http://${window.location.hostname}/mbegu-tv-api`; // En dev

export default API_BASE_URL;
