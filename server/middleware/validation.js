const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

function validateUser(req, res, next) {
  const userSchema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(8).max(40).required(),
    repeat_password: Joi.ref('password'),
    admin: Joi.boolean(),
  }).with('password', 'repeat_password');
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  next();
}

function validateLogin(req, res, next) {
  const loginSchema = Joi.object({
    username: Joi.string().max(20).required(),
    password: Joi.string().max(100).required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validateScreening(req, res, next) {
  const screeningSchema = Joi.object({
    title: Joi.string().max(50),
    day: Joi.date().format('YYYY-MM-DD'),
    time: Joi.string().pattern(/([0-1]\d|[2][0-3]):([0-5]\d)/),
    director: Joi.string().allow('').max(50),
    length: Joi.number().integer().positive().max(1440),
    country: Joi.string().allow('').max(50),
    year: Joi.number().integer().positive().min(1890).max(10000),
    version: Joi.string().allow('').max(50),
    synopsis: Joi.string().allow('').max(2000),
    serial: Joi.string().allow('').max(50),
  });
  const { error } = screeningSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ joiError: error.details[0].message });
  }
  next();
}

function validateSerial(req, res, next) {
  const serialSchema = Joi.object({
    title: Joi.string().max(50),
    year: Joi.number().min(2018).max(10000),
    month: Joi.number().min(1).max(12),
    imageUrl: Joi.string().max(200),
  });
  const { error } = serialSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ joiError: error.details[0].message });
  }
  next();
}

function validateNews(req, res, next) {
  const newsSchema = Joi.object({
    title: Joi.string().max(50),
    date: Joi.date(),
    text: Joi.string().max(10000),
    imageUrl: Joi.string().max(200),
  });
  const { error } = newsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ joiError: error.details[0].message });
  }
  next();
}

module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
module.exports.validateScreening = validateScreening;
module.exports.validateSerial = validateSerial;
module.exports.validateNews = validateNews;
