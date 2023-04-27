import axios from 'axios';

const api = axios.create({
    baseURL: 'https://candidato04.globalthings.net/api',
});

export default api;