/*
 * THIS FILE IS AUTO GENERATED FROM 'kep-source\khepri_idioms_tests.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./lib/khepri-idioms"], (function(require, exports, idioms) {
    "use strict";
    var idiomsTests, listTests, sum, curried_sum, curried = idioms["curried"],
        list = idioms["list"];
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
    var listTwoVal = list(1, 2);
    (listTests.wrapTwoVal_0 = (listTwoVal.fmap((function(y) {
            return (y * 2);
        }))
        .get(1) === 4));
    (listTests.wrapTwoVal_1 = (listTwoVal.fmap((function(x) {
            return x;
        }))
        .get(1) === 2));
    var listXVal = list(1, 2, "QWE");
    (listTests.wrapXVal_0 = (listXVal.fmap((function(y) {
            return (y * 2);
        }))
        .get(2) === "QWE*2"));
    (listTests.wrapXVal_1 = (listXVal.fmap((function(x) {
            return (x + x);
        }))
        .get(2) === "QWEQWE"));
    (exports["idiomsTests"] = idiomsTests);
    (exports["listTests"] = listTests);
    (exports["sum"] = sum);
    (exports["curried_sum"] = curried_sum);
}));