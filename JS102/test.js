var assert = require('assert');

var positiveNumbers = require('./positiveNumbers');
assert.deepEqual(positiveNumbers([1, -3, 5, -3, 0]), [1, 5, 0], "Test failed as the results didn't match");

var matrixAdd = require('./matrixAdd.js');
assert.deepEqual(matrixAdd([
    [1, 3],
    [2, 4]
], [
    [5, 2],
    [1, 0]
]), [
    [6, 5],
    [3, 4]
], 'Matrix Addition has an unexpected result');

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

var ticTacToe = require('./ticTacToe');
assert.deepEqual(ticTacToe([
    ['O', 'O', 'O'],
    ['X', null, 'X'],
    [null, 'X', null]
]), 'O', 'Test1 - TicTacToe has an unexpected output');

assert.deepEqual(ticTacToe([
    ['O', 'X', 'O'],
    ['O', 'X', null],
    [null, 'X', null]
]), 'X', 'Test2 - TicTacToe has an unexpected output');

assert.deepEqual(ticTacToe([
    [null, 'X', 'O'],
    ['O', 'O', null],
    [null, 'X', 'X']
]), null, 'Test3 - TicTacToe has an unexpected output');

assert.deepEqual(ticTacToe([
    ['O', 'X', null],
    [null, 'O', 'X'],
    [null, 'X', 'O']
]), 'O', 'Test4 - TicTacToe has an unexpected output');

assert.deepEqual(ticTacToe([
    ['O', 'X', 'X'],
    [null, 'X', 'X'],
    ['X', 'O', 'O']
]), 'X', 'Test5 - TicTacToe has an unexpected output');