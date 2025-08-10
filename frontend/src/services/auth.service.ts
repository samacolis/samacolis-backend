import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:8000/auth';

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

class AuthService {
  login(email: string, password: string) {
    return axios.post(`${API_URL}/login/`, {
      email, // On envoie l'email avec la clé "email"
      password,
    }).then(response => {
      // Le backend renvoie maintenant des tokens 'access' et 'refresh'
      if (response.data.access) {
        localStorage.setItem('userToken', response.data.access);
      }
      return response;
    }).catch(error => {
      throw new Error(handleAxiosError(error)); // Lancer une erreur avec un message clair
    });
  }

  register(name: string, email: string, password: string, confirmPassword: string, phone: string) {
    return axios.post(`${API_URL}/register/`, {
      email,
      password,
      re_password: confirmPassword,
      name,
      phone,
    }).then(response => {
      return response;
    }).catch(error => {
      throw new Error(handleAxiosError(error));
    });
  }

  logout() {
    localStorage.removeItem('userToken');
  }

  getMe() {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      return Promise.reject('No authentication token found.');
    }

    return axios.get(`${API_URL}/me/`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).catch(error => {
      throw new Error(handleAxiosError(error));
    });
  }

  getCurrentUser() {
    return localStorage.getItem('userToken');
  }

  requestPasswordReset(email: string) {
    return axios.post(`${AUTH_API_BASE_URL}/users/reset_password/`, { email }).catch(error => {
      throw new Error(handleAxiosError(error));
    });
  }

  resetPassword(token: string, newPassword: string) {
    return axios.post(`${AUTH_API_BASE_URL}/users/reset_password_confirm/`, { token, new_password: newPassword }).catch(error => {
      throw new Error(handleAxiosError(error));
    });
  }

  updateProfile(profileData: { name: string; email: string; phone?: string }) {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      return Promise.reject('No authentication token found.');
    }

    return axios.patch(`${API_URL}/me/`, profileData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    }).catch(error => {
      throw new Error(handleAxiosError(error));
    });
  }
}

const authService = new AuthService();
export default authService;
