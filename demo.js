var Validate = require('can-validate-validatejs');
var validate = new Validate();

// Demo
var person = {name: 'Juan', age: '35'};
var constraints = {
  name: {
    presence: true,
    length: 10
  }
};

var err = validate.test(person.name, constraints.name)
console.log('isValid', err);
console.log('errors', validate.errors());
