const assert = require('assert');
let regex = {
    stockticker: /^[A-Z]{1,4}$/,
    creditcard: { creditcard1: /^[0-9]{16}$/, creditcard2: /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/ },
    link: {
        link1: /^(http:\/\/|https:\/\/|http:\/\/www\.|https:\/\/www\.)[a-z]+(\.[a-z]{2,3})$/,
        link2: /^(http:\/\/|https:\/\/|http:\/\/www\.|https:\/\/www\.)[a-z]+(\.[a-z]{2,3}\/)[a-z]+\.[a-z]{4}\?q\=[a-z]+$/
    }
};

assert(regex.stockticker.test('AAPL'), 'stock ticker AAPL failed');
assert(regex.stockticker.test('GOOG'), 'stock ticker GOOG failed');
assert(regex.stockticker.test('MDB'), 'stock ticker MDB failed');
assert(regex.creditcard.creditcard1.test(4000123498762746), 'creditcard1 failed');
assert(regex.creditcard.creditcard2.test("4000-1234-9876-2746"), 'creditcard2 failed');
assert(regex.link.link1.test("https://www.google.com"), "Link1 Test1 failed");
assert(regex.link.link1.test("https://google.com"), "Link1 Test2 failed");
assert(regex.link.link1.test("http://www.google.com"), "Link1 Test3 failed");
assert(regex.link.link1.test("http://google.com"), "Link1 Test4 failed");
assert(regex.link.link2.test("http://facebook.com/mysite.html?q=hello"), "Link2 Test Failed");