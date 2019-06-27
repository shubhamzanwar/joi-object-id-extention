const Lab = require('@hapi/lab');
const Chai = require('chai');
const Sinon = require('sinon');
const Joi = require('@hapi/joi');

const { extention } = require('../src/extension');
const CustomJoi = require('../src');

exports.lab = Lab.script();
const { lab } = exports;
const { expect } = Chai;

lab.experiment('the joi extention function', () => {
  lab.test('should use the string function of the obbejct passed as base', () => {
    const mockJoi = { string: Sinon.stub().returns('test') };
    expect(extention(mockJoi).base).to.eqls('test');
    Sinon.assert.called(mockJoi.string);
  });

  lab.test('should return the value if the mongoid rule is not voilated', () => {
    const mockJoi = { string: Sinon.stub().returns('test') };
    const mockCreateErrorObj = { createError: Sinon.stub() };
    const value = '5d0f33c4f406681883faee82';

    expect(extention(mockJoi).rules[0].validate.call(mockCreateErrorObj, null, value))
      .to.eqls(value);
    Sinon.assert.notCalled(mockCreateErrorObj.createError);
  });

  lab.test('should call the create error method if the mongoid rule is voilated', () => {
    const mockJoi = { string: Sinon.stub().returns('test') };
    const mockCreateErrorObj = { createError: Sinon.stub().returns({ error: true }) };
    const value = 'invalid-id';

    expect(extention(mockJoi).rules[0].validate.call(mockCreateErrorObj, null, value))
      .to.eqls({ error: true });
    Sinon.assert.called(mockCreateErrorObj.createError);
  });
});

lab.experiment('the custom extension created', () => {
  const schema = Joi.object({
    id: CustomJoi.string().objectid().required(),
  });
  lab.test('should be successful if the new object is a string of valid object id', () => {
    const obj = {
      id: '5d0f33c4f406681883faee82',
    };
    const { error } = Joi.validate(obj, schema);
    expect(error).to.eqls(null);
  });

  lab.test('should fail if the id is not mongo object id', () => {
    const obj = {
      id: 'some-invalid-token',
    };
    const { error } = Joi.validate(obj, schema);
    expect(error.isJoi).to.eqls(true);
    expect(error.name).to.eqls('ValidationError');
  });
})
