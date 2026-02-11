import { api } from './api';

export const authService = {
  async login(email, password) {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    // Si realmente requieres client_id y client_secret, podrías agregarlos aquí:
    // params.append('client_id', '...');
    // params.append('client_secret', '...');

    const response = await api.post('/auth/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });


    return response.data;
  },


  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};