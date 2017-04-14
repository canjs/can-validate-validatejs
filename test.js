var makeValidator = require('can-validate-validatejs');
var QUnit = require('steal-qunit');
var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
var isArray = require('can-util/js/is-array/is-array');
var assign = require('can-util/js/assign/assign');

makeValidator.validatejs.validators.checkZipCode = function(value, opts) {
  return new validate.Promise(function(resolve, reject) {
    setTimeout(function() {
      if (typeof value === 'number') {
          resolve();
      } else {
          resolve('default message, should be overridden');
      }
    }, 100);
  });
};

var constraints = {
	age: {
		numericality: {
			message: 'should be a number'
		}
	},
	name: {
		presence: {
			message: 'cannot be blank'
		}
	}
};

var asyncConstraints = {
	zipCode: {
		checkZipCode: {
            message: 'is not a valid zip code'
        }
	}
};
assign(asyncConstraints, constraints);

var invalidPerson = {
	name: '',
	age: 'hello',
	zipCode: false
};

var validPerson = {
	name: 'Juan',
	age: 35,
	zipCode: 0
};

QUnit.module('can-validate-validatejs');

QUnit.test('makeValidator sets errors',function(){
	var validateAge = makeValidator(constraints.age);
	var errors = validateAge(invalidPerson.age);
	var expectedErrors = [constraints.age.numericality.message];
	QUnit.deepEqual(errors, expectedErrors, 'returns expected errors object');
});

QUnit.test('makeValidator validates',function(){
	var validateAge = makeValidator(constraints.age);
	var errors = validateAge(validPerson.age);
	QUnit.notOk(errors, 'value is valid, so no errors return');
});

QUnit.test('makeValidator.many sets errors',function(){
	var validatePerson = makeValidator.many(constraints);
	var errors = validatePerson(invalidPerson);
	var expectedErrors = [
		{
			message: constraints.age.numericality.message,
			related: ['age']
		}, {
			message: constraints.name.presence.message,
			related: ['name']
		}
	];
	QUnit.deepEqual(errors, expectedErrors, 'Many errors are set');
});

QUnit.test('makeValidator.many validates',function(){
	var validatePerson = makeValidator.many(constraints);
	var errors = validatePerson(validPerson);
	QUnit.notOk(errors, 'values are valid, so no errors return');
});

// async method tests
QUnit.test('makeValidator.async sets errors', function (assert) {
    var done = assert.async();
	var validatePerson = makeValidator.async(asyncConstraints);
	var def = validatePerson(invalidPerson);
	var expectedErrors = [
        {
			message: 'is not a valid zip code',
			related: ['zipCode']
		}, {
			message: asyncConstraints.age.numericality.message,
			related: ['age']
		}, {
			message: asyncConstraints.name.presence.message,
			related: ['name']
		}
	];

	def.then(function (errors) {
		QUnit.deepEqual(errors, expectedErrors, 'Many errors are set');
        done();
	});
});

QUnit.test('makeValidator.async validates', function (assert) {
    var done = assert.async();
	var validatePerson = makeValidator.async(asyncConstraints);
	var def = validatePerson(validPerson);
	def.then(function (errors) {
		QUnit.notOk(errors, 'values are valid, so no errors return');
        done();
	});
});
