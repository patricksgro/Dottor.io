import mongoose from "mongoose"
import User from "../../models/Users.js"
import cloudinary from '../../services/CloudinaryConfig.js'


export async function attachUser(req, res, next) {
    try {
        const user = await User.findOne({ _id: req.user.id }) //in requireSession assegnano a req.user id: session.userdId e quindi ha la stringa lunga ecc, e quindi da qui dovendo fare la ricerca in mongoose cerchiamo per _id (perche gli utenti li salviamo cosi) e come valore req.user.id perche id è quello assegnato nella requireSession

        return res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

//FUNZIONI MODIFICA DATI

export async function editData(req, res, next) {
    try {
        const loggedUser = req.user.id

        if (!mongoose.Types.ObjectId.isValid(loggedUser)) {
            return res.status(400).json({ message: 'Id non valido' });
        }

        if (!loggedUser) {
            return res.status(403).json({ message: 'Non hai i permessi' })
        }

        const { name, dateOfBirth, surname, phone, specialization, description, price, role, email, address = {} } = req.body || {}
        const { street, country, postalCode, city } = address || {}

        // oggetto vuoto, modifichiamo solo se i dati ci vengono inviati
        // se il ruolo è dottore e se ci sono gli altri campi li mettiamo
        // altro oggetto vuoto in cui ci sarà i dati di address, se ci sono li mettiamo dentro questo'oggetto
        //verifichiamo se quest'ultimo oggetto ha una lunghezza di almeno 1, se si lo amettiamo nel primo oggetto che conterrà tutto e quindi gli diamo la chiave address con alore secondo oggetto
        const updateData = {}
        if (name) updateData.name = name
        if (surname) updateData.surname = surname
        if (dateOfBirth) updateData.dateOfBirth = dateOfBirth
        if (email) updateData.email = email

        if (role === 'dottore') {
            if (phone) updateData.phone = phone
            if (specialization) updateData.specialization = specialization
            if (description) updateData.description = description
            if (price) updateData.price = price

            if (street) updateData['address.street'] = street;
            if (city) updateData['address.city'] = city;
            if (country) updateData['address.country'] = country;
            if (postalCode) updateData['address.postalCode'] = postalCode;
        }

        //$set è come dire 'setta solo quello che ti passo ed il resto lascialo come è'
        await User.findByIdAndUpdate(loggedUser, { $set: updateData }, { new: true });

        console.log('oggetto con campi', updateData)

        res.status(200).json({ message: 'Dati modificati' })

    } catch (err) {
        next(err)
    }
}

export async function editAvatar(req, res, next) {
    try {
        const loggedUser = req.user.id

        if (!req.file) {
            return res.status(400).json({ message: 'Nessun file caricato' })
        }

        const doctor = await User.findById(loggedUser)
        if (!doctor) {
            return res.status(404).json({ message: 'Dottore non trovato' })
        }

        //per eliminare la img precedente ci serviamo dell'id di essa, di conseguenza lo stesso id lo creeiamo nel db con url nell'oggetto avatar
        if (doctor.avatar.publicId) {
            await cloudinary.uploader.destroy(doctor.avatar.publicId)
        }

        const updateDoctor = await User.findByIdAndUpdate(loggedUser, {
            avatar: {
                url: req.file.url,
                publicId: req.file.public_id
            }
        }, { new: true })


        return res.status(200).json({ message: 'Avatar modificato' })

    } catch (err) {
        next(err)
    }
}