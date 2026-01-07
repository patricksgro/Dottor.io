import mongoose, { Schema } from "mongoose";


const otpSchema = new Schema({
    otp: { type: String, required: true },
    email: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, {timestamps: true})

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Otp = mongoose.model('Otp', otpSchema)

export default Otp