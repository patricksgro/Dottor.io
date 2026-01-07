import rateLimit from "express-rate-limit";

const ipLimiter = rateLimit({
    windowMs: 60 * 1000,  // 1 minuto
    max: 20,              // max 20 richieste per IP al minuto
    message: { message: "Troppi tentativi. Riprova più tardi." }
});

export default ipLimiter