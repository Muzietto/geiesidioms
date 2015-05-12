/*
 * THIS FILE IS AUTO GENERATED FROM 'kep-source\khepri_idioms_tests.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./lib/khepri-idioms"], (function(require, exports, idioms) {
    "use strict";
    var idiomsTests, listTests, sum, curried_sum, curried = idioms["curried"],
        list = idioms["list"],
        y, y0, y1, __mul = (function(x, y) {
            return (x * y);
        }),
        __add = (function(x, y) {
            return (x + y);
        });
    (sum = (function(x, y) {
        return (x + y);
    }));
    (curried_sum = curried(sum));
    (idiomsTests = ({}));
    (idiomsTests.duary_sum = true);
    (idiomsTests.unary_sum = (curried_sum(1)(3) === 4));
    (listTests = ({}));
    var listOneVal = list(1);
    (listTests.wrapOneVal_0 = (listOneVal.fmap((function(y) {
            return (y * 2);
        }))
        .get(0) === 2));
    (listTests.wrapOneVal_1 = (listOneVal.fmap((function(x) {
            return x;
        }))
        .get(0) === 1));
    var listTwoVal = ((y = [1, 2]), list.apply(null, y));
    (listTests.wrapTwoVal_0 = (listTwoVal.fmap((function(y0) {
            return (y0 * 2);
        }))
        .get(1) === 4));
    (listTests.wrapTwoVal_1 = (listTwoVal.fmap((function(x) {
            return x;
        }))
        .get(1) === 2));
    var listXVal = list(1, 2, "QWE");
    (listTests.wrapXVal_0 = (listXVal.fmap((function(y0) {
            return (y0 * 2);
        }))
        .get(1) === 4));
    (listTests.wrapXVal_1 = (listXVal.fmap((function(x) {
            return (x + x);
        }))
        .get(2) === "QWEQWE"));
    var aaa = ((y0 = [(function(y1) {
        return (y1 * 2);
    }), (function(y1) {
        return (y1 + 100);
    }), (function(x) {
        return (x * x);
    })]), list.apply(null, y0)),
        bbb = aaa.ap(list(1, 2, 3));
    (listTests.apUnaryFunctions_0 = (bbb.get(0) === 2));
    (listTests.apUnaryFunctions_3 = (bbb.get(3) === 101));
    (listTests.apUnaryFunctions_8 = (bbb.get(8) === 9));
    var aaa1 = ((y1 = [curried(__add), curried(__mul)]), list.apply(null, y1)),
        bbb1 = aaa1.ap(list(1, 2)),
        ccc1 = bbb1.ap(list(3, 4));
    (listTests.apCurriedFunctions_0 = (ccc1.toString() === "[4,5,5,6,3,4,6,8]"));
    (exports["idiomsTests"] = idiomsTests);
    (exports["listTests"] = listTests);
    (exports["sum"] = sum);
    (exports["curried_sum"] = curried_sum);
}));