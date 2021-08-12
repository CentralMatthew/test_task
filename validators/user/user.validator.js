const Joi = require('joi');

const { regexp } = require('../../constants');

module.exports = {
  createUser: Joi.object().keys({
    first_name: Joi.string().regex(regexp.NAME_REGEXP).required().min(2).max(40),
    last_name: Joi.string().regex(regexp.NAME_REGEXP).required().min(2).max(40),
    email: Joi.string().regex(regexp.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required(),
    phone: Joi.string().regex(regexp.PHONE_REGEXP).required(),
  }),
  updateUser: Joi.object().keys({
    first_name: Joi.string().regex(regexp.NAME_REGEXP).min(2).max(40),
    last_name: Joi.string().regex(regexp.NAME_REGEXP).min(2).max(40),
    email: Joi.string().regex(regexp.EMAIL_REGEXP),
    phone: Joi.string().regex(regexp.PHONE_REGEXP),
  })
};
