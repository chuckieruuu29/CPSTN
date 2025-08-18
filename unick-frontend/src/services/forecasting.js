import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('auth_token');
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export const forecastingAPI = {
	list: () => api.get('/forecast/demand'),
	recommendations: () => api.get('/forecast/reorder-recommendations'),
	generate: (payload) => api.post('/forecast/generate', payload),
};

