import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({ baseURL: API_BASE_URL, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('auth_token');
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export const customersAPI = {
	getAll: (params) => api.get('/customers', { params }),
	getOne: (id) => api.get(`/customers/${id}`),
	create: (data) => api.post('/customers', data),
	update: (id, data) => api.put(`/customers/${id}`, data),
	remove: (id) => api.delete(`/customers/${id}`)
};

