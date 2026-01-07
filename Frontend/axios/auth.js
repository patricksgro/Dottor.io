import instance from './axios.js'

//LOGOUT
export async function logout() {
    try {
        const response = await instance.post('/auth/logout')
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

//SEND OTP LOGIN
export async function sendOTP(userData) {
    try {
        const response = await instance.post('/auth/login', userData)
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function verifyOTP(userData) {
    try {
        const response = await instance.post('/auth/verify-otp', userData)
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

//REGISTER

export async function sendOtpRegister(userData) {
    try {
        const response = await instance.post('/auth/send-otp', userData)
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function register(userData) {
    try {
        const response = await instance.post('/auth/register', userData)
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

//SESSIONE SEMPRE ATTIVA
export async function keepAlive() {
    try {
        const response = await instance.get('/auth/keep-alive');
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

//DATI UTENTE LOGGATO
export async function userData() {
    try {
        const response = await instance.get('/user/me')
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}
