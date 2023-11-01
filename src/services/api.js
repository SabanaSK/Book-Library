import axios from 'axios';

const instance = axios.create({
    baseURL: '/api', 
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        window.location = '/login';
    }
    return Promise.reject(error);
});


export default instance;
