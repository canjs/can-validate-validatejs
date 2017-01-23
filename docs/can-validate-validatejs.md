@module {function} can-validate-validatejs
@parent can-ecosystem
@group can-validate-validatejs.methods 1 Methods
@package ../package.json

@description Create [can-validate.validator] functions using [validate.js](https://validatejs.org/).

@signature `makeValidator(constraints)`

Returns a validator function that can be used to validate a single value.

  ```js
  var validateAge = makeValidator({
      numericality: true
  });
  ```


  @param {Object} constraints An object of definitions used by the Validate.js library to run validations on a value.

  @return {Validator} A validator type function that takes a value and validates it against the provided constraints.

@body

## Usage

A validator can be created either for a single value or for many values.  More information on how to configure Validate.JS constraints can be found [here](https://validatejs.org/#validators).

### Single value validation

Using the [Validate.js](https://validatejs.org/) library validators and configuration, call `makeValidator` and pass the desired constraints. The resulting function can then be used to validate specific values.

```js
var makeValidator = require('can-validate-validatejs');
var validateAge = makeValidator({
    numericality: true
});

var age = 'hello';
validateAge(age); //> ['is not a number']

var anotherAge = 35;
validateAge(anotherAge); //> undefined
```

### Multiple value validation

Using the [can-validate-validatejs.many] works similar to `makeValidator`, except that `makeValidator.many` produces a validator that expects an object of values. The validator will run constraints on respective values based on the keys provided.

```javascript
var makeValidator = require('can-validate-validatejs');
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
