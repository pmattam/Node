var assert = require('assert');

var positiveNumbers = require('./positiveNumbers');
assert.deepEqual(positiveNumbers([1, -3, 5, -3, 0]), [1, 5, 0], "Test failed as the results didn't match");

var matrixMultiplication = require('./matrixMultipication');
assert.deepEqual((matrixMultiplication([
    [2, 4],
    [3, 4]
], [
    [5, 2],
    [3, 1]
])), [
    [22, 8],
    [27, 10]
], 'Test1 - Matrix multiplication result is not an expected result');
assert.deepEqual(matrixMultiplication([
    [5, 2, 8],
    [1, 2, 3]
], [
    [2, 4],
    [3, 4],
    [1, 3]
]), [
    [24, 52],
    [11, 21]
], 'Test2 - Matrix multiplication result is not an expected result');
assert.deepEqual(matrixMultiplication([
    [2, 4],
    [3, 4],
    [1, 3]
], [
    [5, 2, 8],
    [1, 2, 3]
]), [
    [14, 12, 28],
    [19, 14, 36],
    [8, 8, 17]
], 'Test3 - Matrix multiplication result is not an expected result');