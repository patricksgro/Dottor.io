import mongoose, { Schema } from "mongoose";

//NOTA IMPORTANTE, PORTARE QUESTO IN PRODUZIONE SOLO SE UN GIORNO RIPRENDERò IL PROGETTO E POTRò FAR FARE I PAGAMENTI ONLINE

const appointmentSchema = new Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    status: {
        type: String,
        enum: ["booked", "deleted"],
    },
}, { timestamps: true })

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment