import express from 'express'
import bodyPareser from "body-parser"
import Stripe from 'stripe'


const webhookRputer = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpoitSecret = process.env.STRIPE_WEBHOOK_SECRET

webhookRputer.post('/webhook', bodyPareser.raw({ type: "application/json" }), (req, res) => {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        console.warn('Webhook Stripe non configurato')
        return res.status(501).send('Webhook non attivo')
    }
    const sig = req.headers['stripe-signature'] //reperiamo l'evento firma perche stripe la mette in headers

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpoitSecret)
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object
        // qui aggiorni DB, invii email, ecc.
        console.log("Pagamento completato, session id:", session.id)
    }

    res.status(200).send("OK")
})


export default webhookRputer