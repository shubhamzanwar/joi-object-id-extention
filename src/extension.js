const Mongoose = require('mongoose');

const extention = joi => ({
  base: joi.string(),
  name: 'string',
  language: {
    objectid: 'needs to be a valid object id',
  },
  rules: [{
    name: 'objectid',
    validate(params, value, state, options) {
      if (!Mongoose.Types.ObjectId.isValid(value)) {
        return this.createError('string.objectid', { v: value }, state, options);
      }
      return value;
    },
  }],
});

module.exports = {
  extention
};
