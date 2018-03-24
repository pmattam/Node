const assert = require('assert');
let regex = {
    stockticker: /^[A-Z]{1,4}$/,
    creditcard: { creditcard1: /^[0-9]{16}$/, creditcard2: /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/ },
};

assert(regex.stockticker.test('AAPL'), 'stock ticker AAPL failed');
assert(regex.stockticker.test('GOOG'), 'stock ticker GOOG failed');
assert(regex.stockticker.test('MDB'), 'stock ticker MDB failed');
assert(regex.creditcard.creditcard1.test(4000123498762746), 'creditcard1 failed');
assert(regex.creditcard.creditcard2.test("4000-1234-9876-2746"), 'creditcard2 failed');