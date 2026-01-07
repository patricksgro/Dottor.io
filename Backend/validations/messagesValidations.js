import Joi from "joi";

export const messageSchema = Joi.object({
    receiverId: Joi.string().required(),
    text: Joi.string().min(1).required().trim()
});

//funzione validazione messaggi webSocket
export async function validatorMessageJOI(data) {
    const {error} = messageSchema.validate(data)

    if(error) {
        throw new Error('"Dati messaggio non validi"')
    }
}