import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// API service functions
export const apiService = {
  // Contact endpoints
  contact: {
    async create(data) {
      const response = await axios.post(`${API}/contact/`, data);
      return response.data;
    },
    async getAll() {
      const response = await axios.get(`${API}/contact/`);
      return response.data;
    }
  },

  // Services endpoints
  services: {
    async getAll() {
      const response = await axios.get(`${API}/services/`);
      return response.data;
    },
    async getById(id) {
      const response = await axios.get(`${API}/services/${id}`);
      return response.data;
    }
  },

  // Testimonials endpoints
  testimonials: {
    async getAll() {
      const response = await axios.get(`${API}/testimonials/`);
      return response.data;
    },
    async create(data) {
      const response = await axios.post(`${API}/testimonials/`, data);
      return response.data;
    }
  },

  // Plans endpoints
  plans: {
    async getAll() {
      const response = await axios.get(`${API}/plans/`);
      return response.data;
    },
    async subscribe(data) {
      const response = await axios.post(`${API}/plans/subscribe`, data);
      return response.data;
    }
  },

  // Work images endpoints
  work: {
    async getAll() {
      const response = await axios.get(`${API}/work/`);
      return response.data;
    }
  },

  // Company info endpoints
  company: {
    async getInfo() {
      const response = await axios.get(`${API}/company/info`);
      return response.data;
    }
  },

  // Health check
  async healthCheck() {
    const response = await axios.get(`${API}/health`);
    return response.data;
  }
};