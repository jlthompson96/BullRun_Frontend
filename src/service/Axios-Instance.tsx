import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://bullrun-backend-olsqzhz6hq-uc.a.run.app/',
});

api.interceptors.request.use(
    (config) => {
        // Add any request-specific logic here, such as token authentication
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        // Add any response-specific logic here
        return response;
    },
    (error) => {
        // Add error handling logic here
        return Promise.reject(error);
    }
);



export default api;
