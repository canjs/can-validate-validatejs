@function can-validate-validatejs.async async
@parent can-validate-validatejs.methods

@signature `makeValidator.async(constraints)`

  Returns a validator function that can be used to validate many values at once.

  ```js
  var validatePerson = makeValidator.async({
      zipCode: {
          verifyZipCode: true
      }
  });
  ```

  @param {Object} constraints A map of objects which contain definitions used by the Validate.js library.

  @return {Validator} A [can-validate.validator] type function that takes an object of values and validates every value based on the provided constraints. This validator will always return a Promise.


@body

## Example

  ```js
  var makeValidator = require('can-validate-validatejs');
  
  // Create custom validator before using it
  makeValidator.validatejs.validators.verifyZipCode = function(value) {
    return new validate.Promise(function(resolve, reject) {
      // Call a Zip Code verification service here,
      //  then resolve/reject the promise
    });
  };
  
  var validatePerson = makeValidator.async({
      zipCode: {
          verifyZipCode: true
      }
  });

  var invalidPerson = {
      zipCode: 00000
  };
  validatePerson(invalidPerson).then(function (errors) {
      //errors = {zipCode: ['not a valid zip code']}
      // Do stuff with errors here
  }); 

  var validPerson = {
      zipCode: 27501
  };
  validatePerson(validPerson).then(function (errors) {
      // errors = undefined
      // Handle valid behaviors
  }); 
  ```
