import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('user:password')}`,
    },
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(new Error(error));
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(new Error(error));
    }
);



export default api;
