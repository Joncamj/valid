import joi from 'joi'

export const createUserSchema = joi.object({
    name: joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
        'string.empty': 'Le nom est requis.',
        'string.min': 'Le nom doit contenir au moins 2 caractères',
    }),
    email: joi.string()
    .email({ tlds: { allow: false }})
    .required()
    .messages({
        'string.email': 'Le format de l\'email est invalide.',
        'string.empty': 'L\'email est requis.',
    }),
    password: joi.string()
    .min(6)
    .required()
    .message({
        'string.min': 'Le mot de passe doit contenir au moins 6 carctères.',
        'string.empty': 'Le mot de passe est requis',
    })
})