var each = require('can-util/js/each/each');
var validatejs = require('validate.js');
var map = require('lodash/map');
var flatten = require('lodash/flatten');

var makeValidator = function (constraints) {
	return function (value) {
		// Returns an array or undefined
		return validatejs.single(value, constraints);
	};
};

var processErrors = function (rawErrors) {
	return map(rawErrors, function (error) {
		return {message: error.options.message || error.error, related: [error.attribute]};
	});
};

var normalizeAsyncErrors = function (errors) {
	var resp = [];
	each(errors, function (errorList, key) {
		resp.push(map(errorList, function (error) {
			return {
				options: {
					message: error
				},
				attribute: key
			};
		}));
	});
	return flatten(resp);
};

makeValidator.many = function (constraints) {
	return function (values) {
		var rawErrors = validatejs(values, constraints, {format: 'detailed', fullMessages: false});
		return rawErrors ? processErrors(rawErrors) : undefined;
	};
};

makeValidator.async = function (constraints) {
	return function (values) {
		return validatejs.async(values, constraints, {format: 'detailed', fullMessages: false})
			// When validation is successful, ValidateJS returns the values object
			// in an attempt to be consistent, it should return undefined.
			.then(function () {
				return undefined;
			})
			// Normalize error response from async handlers.
			// When a async validator is rejected, catch is called with single error string
			// but when validator is resolved with errors, it will return all errors
			// as an array.
			.catch(function (rawErrors) {
				rawErrors = typeof rawErrors === 'string' ? normalizeAsyncErrors({'*':[rawErrors]}) : rawErrors;
				return rawErrors ? processErrors(rawErrors) : undefined;
			});
	};
};

makeValidator.validatejs = validatejs;

module.exports = makeValidator;
