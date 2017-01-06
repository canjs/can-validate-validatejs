@module {Object} can-validate-validatejs
@parent can-ecosystem
@group can-validate-validatejs.core 1 can-validate-validatejs Core
@package ./package.json

@description A plugin for CanJS that wraps any validation library to `can.validate`.
**Can-Validate doesn't do any validation of its own** but instead provides some abstraction to your library of choice. The chosen library is registered with can-validate using a shim.

@type {Object}

```javascript
var Validate = require('can-validate-validatejs');
var validate = new Validate();

var err = validate.test('', {presence: true}); //> false
validate.errors(); //> ['is required.']
```

@body

Easily check a value's validity by using the test method which is proxied to Validate.JS's `single` method.
