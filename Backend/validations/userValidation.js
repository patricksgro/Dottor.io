import Joi from "joi";

const namePattern = /^[a-zA-Z0-9àèéìòùÀÈÉÌÒÙ' -]+$/;

export const createUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(200)
        .trim()
        .pattern(namePattern)
        .required()
        .messages({
            "string.base": "Il nome deve essere una stringa",
            "string.empty": "Il nome è obbligatorio",
            "any.required": "Il nome è obbligatorio",
            "string.min": "Il nome deve avere almeno 2 caratteri",
            "string.max": "Il nome non può superare i 200 caratteri",
            "string.pattern.base": "Il nome contiene caratteri non validi"
        }),

    avatar: Joi.object({
        url: Joi.string()
            .allow('', null)
            .messages({
                "string.base": "L avatar deve essere una url valida"
            })
            .when('role', {
                is: 'dottore',
                then: Joi.required().messages({
                    'any.required': 'L avatar è richiesta per il ruolo dottore',
                }),
                otherwise: Joi.strip()
            }),
        publicId: Joi.string()
            .allow('', null)
            .messages({
                "string.base": "L id deve essere una stringa valida"
            })
            .when('role', {
                is: 'dottore',
                then: Joi.required().messages({
                    'any.required': 'L id è richiesto per il ruolo dottore',
                }),
                otherwise: Joi.strip()
            })
    }).allow('', null).when('role', { is: 'paziente', then: Joi.strip() }),

    surname: Joi.string()
        .min(2)
        .max(200)
        .trim()
        .required()
        .pattern(namePattern)
        .allow(null)
        .messages({
            "string.base": "Il cognome deve essere una stringa",
            "string.min": "Il cognome deve avere almeno 2 caratteri",
            "string.max": "Il cognome non può superare i 200 caratteri",
            "string.pattern.base": "Il cognome contiene caratteri non validi"
        }),

    dateOfBirth: Joi.date()
        .less("now")
        .required()
        .greater("1920-01-01")
        .messages({
            "date.base": "La data di nascita deve essere una data valida",
            "date.less": "La data di nascita non può essere futura",
            "date.greater": "La data di nascita non può essere precedente al 1920",
        }),

    address: Joi.object({
        city: Joi.string()
            .allow('', null)
            .min(2)
            .max(50)
            .trim()
            .messages({
                "string.base": "La città deve essere una stringa",
                "string.empty": "La città è obbligatoria",
            })
            .when('role', {
                is: 'dottore',
                then: Joi.required().messages({
                    'any.required': 'La città è richiesta per il ruolo dottore',
                }),
                otherwise: Joi.strip()
            }),
        country: Joi.string()
            .allow('', null)
            .min(2)
            .max(50)
            .trim()
            .messages({
                "string.base": "La nazione deve essere una stringa",
            })
            .when('role', {
                is: 'dottore',
                then: Joi.required().messages({
                    'any.required': 'Lo stato è richiesto per il ruolo dottore',
                }),
                otherwise: Joi.strip()
            }),
        street: Joi.string()
            .allow('', null)
            .min(2)
            .max(200)
            .trim()
            .messages({
                "string.base": "La via deve essere una stringa",
            })
            .when('role', {
                is: 'dottore',
                then: Joi.required().messages({
                    'any.required': 'L\'indirizzo è richiesto per il ruolo dottore',
                }),
                otherwise: Joi.strip()
            }),
        postalCode: Joi.string()
            .allow('', null)
            .min(3)
            .max(30)
            .trim()
            .messages({
                "string.base": "Il CAP deve essere una stringa",
            })
            .when('role', {
                is: 'dottore',
                then: Joi.required().messages({
                    'any.required': 'Il codice postale è richiesto per il ruolo dottore',
                }),
                otherwise: Joi.strip()
            }),
    }).allow('', null).when('role', { is: 'paziente', then: Joi.strip() }),

    phone: Joi.string()
        .pattern(/^[0-9+\- ]{6,20}$/)
        .allow('', null)
        .max(50)
        .messages({
            "string.base": "Il numero di telefono deve essere una stringa",
            "string.pattern.base": "Il numero di telefono contiene caratteri non validi",
        }),

    email: Joi.string()
        .pattern(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,7}$/)
        .lowercase()
        .required()
        .messages({
            "string.email": "Email non valida",
            "string.empty": "L'email è obbligatoria",
            "any.required": "L'email è obbligatoria",
            "string.pattern.base": "L'email deve avere un dominio valido (es. .com, .it, max 7 caratteri)."
        }),

    password: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.min": "La password deve avere almeno 8 caratteri",
        }),
    role: Joi.string()
        .valid('paziente', 'dottore')
        .required()
        .lowercase()
        .messages({
            'any.only': 'Il valore deve essere paziente o dottore',
        }),

    specialization: Joi.string()
        .messages({
            "string.min": "La specializzazione deve essere una stringa testuale valida",
        })
        .when('role', {
            is: 'dottore',
            then: Joi.required().messages({
                'any.required': 'La specializzazione è richiesta per il ruolo dottore',
            }),
            otherwise: Joi.optional(),
        }),

    price: Joi.number()
        .allow('', null)
        .when('role', {
            is: 'dottore',
            then: Joi.required().messages({
                'any.required': 'Il prezzo è richiesto per il ruolo dottore',
            }),
            otherwise: Joi.optional(),
        }),

    description: Joi.string()
        .allow('', null)
        .min(1)
        .max(500)
        .messages({
            "string.min": "La descrizione deve avere almeno 20 caratteri",
            "string.max": "La descrizione deve avere al massimo 500 caratteri",
        })
        .when('role', {
            is: 'dottore',
            then: Joi.required().messages({
                'any.required': 'La descrizione è richiesta per il ruolo dottore',
            }),
            otherwise: Joi.optional(),
        }),

    otp: Joi.string().required().messages({
        "any.required": "L’OTP è obbligatorio"
    })
});


export const updateUserSchema = Joi.object({
    name: createUserSchema.extract("name").optional(),
    avatar: createUserSchema.extract("avatar").optional(),
    surname: createUserSchema.extract("surname").optional(),
    email: createUserSchema.extract("email").optional(),
    dateOfBirth: createUserSchema.extract("dateOfBirth").optional(),
    phone: createUserSchema.extract("phone").optional(),
    specialization: createUserSchema.extract("specialization").optional(),
    price: createUserSchema.extract("price").optional(),
    description: createUserSchema.extract("description").optional(),
    role: createUserSchema.extract("role").optional(),
    address: Joi.object({
        city: createUserSchema.extract("address").extract("city").optional(),
        country: createUserSchema.extract("address").extract("country").optional(),
        street: createUserSchema.extract("address").extract("street").optional(),
        postalCode: createUserSchema.extract("address").extract("postalCode").optional()
    }).optional(),
    password: Joi.string().min(8).optional()
});