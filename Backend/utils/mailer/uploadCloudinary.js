import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import CloudinaryStorage from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//check lato cloudinary, cartella salvataggio, formati accettati
const storageCloudinary = new CloudinaryStorage({
    cloudinary: { v2: cloudinary },
    params: {
        folder: 'Dottor.io',
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
})

//check lato server, validazione vera e propria immagini, solo se img ok
//prima di arrivare a cloudinary
const fileFilter = (req, file, cb) => {
    // mimetype reale del file
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // accetta il file
    } else {
        cb(new Error("Solo file immagine sono consentiti"), false);
    }
};

//cloudinary non gestisce da solo la dimensione accettata e quindi ci serviamo di multer per farlo: Configurazione multer con LIMITI
//prima di arrivare a cloudinary
//multer = middleware di express per formData
const uploadCloudinary = multer({
    storage: storageCloudinary,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // ✅ 2 MB
    },
});

export default uploadCloudinary