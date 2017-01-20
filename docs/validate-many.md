@property {function} can-validate-validatejs/methods/many Many
@parent can-validate-validatejs/methods

@signature `makeValidator.many(constraints)`

Returns a validator function that can be used to validate many values at once.

  @param {Object} constraints A map of objects which contain definitions used by the Validate.js library.

  @return {Validator} A [can-validate/types/validator] type function that takes an object of values and validates every value based on the provided constraints.
  ```javascript
  var validatePerson = makeValidator.many({
      age: {
          numericality: true
      },
      name: {
          presence: true
      }
  });
  ```

@body

## Example

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
