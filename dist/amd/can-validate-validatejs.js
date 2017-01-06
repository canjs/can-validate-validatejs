/*can-validate-validatejs@0.0.0#can-validate-validatejs*/
define(function (require, exports, module) {
    var OldValidate = require('can-validate');
    var validatejs = require('validate');
    var shim = {
        test: function () {
            return validatejs.single.apply(validatejs, arguments);
        }
    };
    var NewValidate = OldValidate.extend(function () {
        this.registerLibrary('validate.js', shim);
    });
    module.exports = NewValidate;
});
//# sourceMappingURL=can-validate-validatejs.js.map