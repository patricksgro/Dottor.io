import instance from "./axios";

export async function edit(data) {
    try {
        const res = await instance.post('/user/editData', data)
        return res.data
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function editAvatar(avatar) {
    try {
        const formData = new FormData()
        //il primo parametro è il nome del campo che si aspetta cloudinary nella lettura backend con .single('avatar')
        formData.append('avatar', avatar)

        const res = await instance.patch('/user/editAvatar', formData)
        return res.data
    } catch (err) {
        return Promise.reject(err)
    }
}