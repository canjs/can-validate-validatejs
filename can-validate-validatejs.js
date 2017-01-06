var OldValidate = require('can-validate');
var validatejs = require('validate.js');

var shim = {
    test: function () {
        return validatejs.single.apply(validatejs, arguments);
    }
};

var NewValidate = OldValidate.extend(function () {
    this.registerLibrary('validate.js', shim);
});

module.exports = NewValidate;
