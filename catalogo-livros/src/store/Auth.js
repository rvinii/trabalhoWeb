// src/store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login({ email, password }) {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local', {
          identifier: email,
          password: password,
        });
        this.token = response.data.jwt;
        this.user = response.data.user;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message); // Log do erro para depuração
        throw new Error('Falha ao realizar login. Verifique suas credenciais.'); // Uma mensagem mais amigável
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});
