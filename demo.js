var makeValidator = require("can-validate-validatejs");

var validateAge = makeValidator({
    numericality: true
});

var validatePerson = makeValidator.many({
    age: {
        numericality: true
    },
    name: {
        presence: true
    }
});

var person = {
    name: '',
    age: 'hello'
};

console.log(validateAge(person.age));
console.log(validatePerson(person));
