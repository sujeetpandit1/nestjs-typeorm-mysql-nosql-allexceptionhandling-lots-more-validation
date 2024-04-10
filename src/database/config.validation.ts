import * as Joi from 'joi';

//for postegres
export const ConfigValidation = Joi.object({
    PORT: Joi.number().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().port().default(5432).required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),

})

//form mysql
// export const ConfigValidation = Joi.object({
    // PORT: Joi.number().required(),
//     MYSQL_HOST: Joi.string().required(),
//     MYSQL_PORT: Joi.number().required(),
//     MYSQL_USER: Joi.string().required(),
//     MYSQL_PASSWORD: Joi.string().required(),
//     MYSQL_DB: Joi.string().required()
// })

