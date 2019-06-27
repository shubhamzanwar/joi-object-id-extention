const Joi = require('@hapi/joi');
const {extention} = require('./extension');

const CustomJoi = Joi.extend(extention);

module.exports = CustomJoi;