import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    withCredentials: true
})

instance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            // logout automatico
            window.dispatchEvent(new Event("session-expired"));
        }
        return Promise.reject(error);
    }
);

export default instance