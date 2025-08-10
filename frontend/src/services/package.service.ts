import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Fonction utilitaire pour extraire un message d'erreur significatif
const handleAxiosError = (error: any) => {
  if (error.response) {
    // Le serveur a répondu avec un statut d'erreur (4xx ou 5xx)
    if (error.response.data && error.response.data.detail) {
      return error.response.data.detail; // Message d'erreur spécifique de DRF
    } else if (error.response.data && typeof error.response.data === 'object') {
      // Si la réponse est un objet avec plusieurs erreurs de validation
      return Object.values(error.response.data).flat().join(' ');
    } else if (error.response.data) {
      return error.response.data; // Autre message d'erreur du serveur
    }
    return `Erreur du serveur: ${error.response.status}`; // Statut HTTP
  } else if (error.request) {
    // La requête a été faite mais aucune réponse n'a été reçue
    return 'Aucune réponse du serveur. Vérifiez votre connexion.';
  } else {
    // Quelque chose s'est passé lors de la configuration de la requête
    return `Erreur: ${error.message}`;
  }
};

class PackageService {
  getPackages() {
    const userToken = localStorage.getItem('userToken');
    console.log("Token utilisé pour la requête:", userToken); // Affiche le token
    if (!userToken) {
      return Promise.reject('No authentication token found.');
    }

    return axios.get(`${API_URL}/colis/`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).catch(error => {
      throw new Error(handleAxiosError(error));
    });
  }
  createPackage(colisData: any) {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      return Promise.reject('No authentication token found.');
    }

    return axios.post(`${API_URL}/colis/`, colisData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    }).catch(error => {
      throw new Error(handleAxiosError(error));
    });
  }
  getTrackingHistory(colisId: string) {
    return axios.get(`${API_URL}/historique-suivi/?colis=${colisId}`).catch(error => {
      throw new Error(handleAxiosError(error));
    });
  }

  getPackageById(colisId: string) {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      return Promise.reject('No authentication token found.');
    }

    return axios.get(`${API_URL}/colis/${colisId}/`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).catch(error => {
      throw new Error(handleAxiosError(error));
    });
  }
}

const packageService = new PackageService();
export default packageService;
