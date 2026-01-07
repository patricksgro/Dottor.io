import 'dotenv/config'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function createCheckoutSession(req, res, next) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(501).json({
                error: 'Pagamenti non attivi',
            })
        }
        //recuperiamo il prodotto da acquistare dal frontend
        const { toArrayDoctor } = req.body

        // Creiamo la sessione di pagamento
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: toArrayDoctor.map(d => ({
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: `${d.name} ${d.surname}`
                    },
                    unit_amount: d.price * 100, // in centesimi
                },
                quantity: 1,
            })),
            success_url: "http://localhost:5173/payments/success", // da cambiare solo se i pagamenti saranno abilitati
            cancel_url: "http://localhost:5173/payments/cancel", // da cambiare solo se i pagamenti saranno abilitati
        })

        res.json({ url: session.url });
    } catch (err) {
        next(err)
    }
}