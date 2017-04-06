/*can-validate-validatejs@0.0.5#can-validate-validatejs*/
define(function (require, exports, module) {
    var each = require('can-util/js/each');
    var validatejs = require('validate');
    var makeValidator = function (constraints) {
        return function (value) {
            return validatejs.single(value, constraints);
        };
    };
    makeValidator.many = function (constraints) {
        return function (values) {
            var rawErrors = validatejs(values, constraints, {
                format: 'detailed',
                fullMessages: false
            });
            var errors;
            if (rawErrors) {
                errors = [];
                each(rawErrors, function (error) {
                    errors.push({
                        message: error.options.message || error.error,
                        related: [error.attribute]
                    });
                });
            }
            return errors;
        };
    };
    makeValidator.validatejs = validatejs;
    module.exports = makeValidator;
});
//# sourceMappingURL=can-validate-validatejs.js.map