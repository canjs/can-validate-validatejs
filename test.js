var makeValidator = require('can-validate-validatejs');
var QUnit = require('steal-qunit');
var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');

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

var invalidPerson = {
    name: '',
    age: 'hello'
};

var validPerson = {
    name: 'Juan',
    age: 35
};

var validateAge;
var validatePerson;

QUnit.module('can-validate-validatejs');

QUnit.test('makeValidator sets errors',function(){
    validateAge = makeValidator(constraints.age);
    errors = validateAge(invalidPerson.age);
	QUnit.equal(errors.length, 1);
    QUnit.equal(errors[0], constraints.age.numericality.message);
});

QUnit.test('makeValidator validates',function(){
    validateAge = makeValidator(constraints.age);
    errors = validateAge(validPerson.age);
	QUnit.equal(errors, undefined);
});

QUnit.test('makeValidator.many sets errors',function(){
    validatePerson = makeValidator.many(constraints);
    errors = validatePerson(invalidPerson);
	QUnit.equal(isEmptyObject(errors), false);
    QUnit.equal(errors.name[0], constraints.name.presence.message);
});

QUnit.test('makeValidator.many validates',function(){
    validatePerson = makeValidator.many(constraints);
    errors = validatePerson(validPerson);
	QUnit.equal(errors, undefined);
});
