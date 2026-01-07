import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    avatar: {
        url: { type: String, default: '/defaultUserImg.jpg', required: function () { return this.role === "dottore" } },
        publicId: { type: String, required: function () { return this.role === "dottore" } },   // ID usato da Cloudinary per cancellare l’immagine
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    dateOfBirth: {
        required: true,
        type: Date
    },
    role: {
        type: String,
        enum: ['paziente', 'dottore'],
        lowercase: true,
        required: true
    },
    address: {
        street: { type: String, maxLength: 100, required: function () { return this.role === "dottore" }, },
        country: { type: String, maxLength: 50, required: function () { return this.role === "dottore" }, },
        postalCode: { type: String, maxLength: 30, required: function () { return this.role === "dottore" }, },
        city: { type: String, maxLength: 50, required: function () { return this.role === "dottore" }, }
    },
    phone: {
        type: String,
        maxLength: 50,
        required: function () { return this.role === "dottore" }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,7}$/, 'Email non valida']
    },
    password: {
        type: String,
        minLength: 8,
        select: false,
        required: true
        //required true perche qui l'accesso con Google non mi servirà a nulla
    },

    //DISTINZIONE, CAMPI OPZIONALI PER DOTTORI:

    specialization: { type: String, required: function () { return this.role === "dottore" } },
    price: { type: Number, required: function () { return this.role === "dottore" } },
    description: { type: String, minLength: 1, required: function () { return this.role === "dottore" } },

}, { timestamps: true })

//SE LA PASS VERRà MODFICATA DEVE ESSERE HASHATA
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//FUNZIONE DI VERIFICA PER APPURARE CREDENZIALI NEL LOGIN
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

export default User