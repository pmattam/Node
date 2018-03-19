var assert = require('assert');

var positiveNumbers = require('./positiveNumbers');
assert.deepEqual(positiveNumbers([1, -3, 5, -3, 0]), [1, 5, 0], "Test failed as the results didn't match");