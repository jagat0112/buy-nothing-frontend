import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(5).max(20).required().messages({
    "string.base": `Name should be a type of 'text'`,
    "string.empty": `Name cannot be an empty`,
    "string.min": `Name should have a minimum length of {#limit}`,
    "any.required": `Name is a required`,
  }),
  phone: Joi.number().min(10).required().label("Email").messages({
    "string.base": `Phone should be a type of number`,
    "string.empty": `Phone cannot be an empty`,
    "string.min": `Phone should have a minimum length of {#limit}`,
    "any.required": `Phone is a required`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.empty": `Email cannot be an empty`,
      "string.min": `Email should have a minimum length of {#limit}`,
      "any.required": `Email is a required`,
    }),
  address: Joi.string().max(50).required().messages({
    "string.base": `Address should be a type of 'text'`,
    "string.empty": `Address cannot be an empty`,
    "string.min": `Address should have a minimum length of {#limit}`,
    "any.required": `Address is a required`,
  }),
  password: Joi.string(),
});

export const loginSchema = Joi.object({
  phone: Joi.number().min(10).required().messages({
    "number.base": `Phone Number should be not contain text`,
    "number.max": `Phone should have a length of {#limit}`,
    "any.required": `Phone is a required`,
  }),
  password: Joi.string(),
});
