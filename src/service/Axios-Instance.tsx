import axios from 'axios';


const headers: Readonly<Record<string, string | boolean>> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://bull-run-frontend.vercel.app',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '3600',
    // 'Autherization': 'Bearer ' + localStorage.getItem('token'),


};

const api = axios.create({
    baseURL: 'https://thompsonserver.net/',
    headers: headers,
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