@module {Object} can-validate-validatejs
@parent can-ecosystem
@package ./package.json

@description Creates validator function that encapsulates provided constraints in order to validate values as needed.

@signature makeValidator(constraints)

Returns a validator function that can be used to validate a single value.

@param {Object} constraints An object of definitions used by the Validate.js library to run validations on a value.

@return {Validator} A validator type function that takes a value and validates it against the provided constraints.

@signature makeValidator.many(constraints)

Returns a validator function that can be used to validate many values at once.

@param {Object} constraints A map of objects which contain definitions used by the Validate.js library to run validations on a value.

@return {Validator} A validator type function that takes an object of values and validates every value based on the provided constraints.


@body

## Usage

A validator can be created either for a single value or for many values.

### Single value validation

Using the Validate.js library validators and configuration, call `makeValidator` and pass the desired constraints. The resulting function can then be used to validate specific values.

```javascript
var validateAge = makeValidator({
    numericality: true
});

var age = 'hello';
validateAge(age); //> ['is not a number']

var anotherAge = 35;
validateAge(anotherAge); //> undefined
```

### Multiple value validation

Similar to using `makeValidator`, except that `makeValidator.many` produces a validator that expects an object of values. The validator will run constraints on respective values based on the keys provided.

```javascript
var validatePerson = makeValidator.many({
    age: {
        numericality: true
    },
    name: {
        presence: true
    }
});

var invalidPerson = {
    name: '',
    age: 'hello'
};
validatePerson(invalidPerson); //> {name: ['is required'], age: ['is not a number']}

var validPerson = {
    name: 'Juan',
    age: 35
};
validatePerson(validPerson); //> undefined
```
