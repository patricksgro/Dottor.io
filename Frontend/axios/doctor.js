import instance from './axios.js'


export async function getDoctors(params) {
    try {
        const response = await instance.get('/doctors/getAll', {params})
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getSpecializations(specialization, params) {
    try {
        const response = await instance.get(`/doctors/specialization/${specialization}`, {params})
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getSingleDoctor(id) {
    try {
        const response = await instance.get(`/doctors/details/${id}`)
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}