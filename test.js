var Validate = require('can-validate-validatejs');
var QUnit = require('steal-qunit');

var validate;

QUnit.module('Map Validate Plugin', {
	setup: function(){
		validate = new Validate();
	}
});

QUnit.test('sets library',function(){
	QUnit.equal(validate.library.name, 'validate.js');
});
