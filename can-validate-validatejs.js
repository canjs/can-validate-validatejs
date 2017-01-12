var validatejs = require('validate.js');

var makeValidator = function (constraints) {
    return function (value) {
        return validatejs.single(value, constraints);
    };
};

makeValidator.many = function (constraints) {
    return function (values) {
        return validatejs(values, constraints, {fullMessages: false});
    };
};

module.exports = makeValidator;
