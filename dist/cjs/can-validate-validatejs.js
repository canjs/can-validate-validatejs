/*can-validate-validatejs@0.0.1#can-validate-validatejs*/
var OldValidate = require('can-validate');
var validatejs = require('validate.js');
var shim = {
    test: function () {
        return validatejs.single.apply(validatejs, arguments);
    }
};
var NewValidate = OldValidate.extend({
    init: function () {
        this.registerLibrary('validate.js', shim);
    }
});
module.exports = NewValidate;
//# sourceMappingURL=can-validate-validatejs.js.map