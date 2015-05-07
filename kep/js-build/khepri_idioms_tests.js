/*
 * THIS FILE IS AUTO GENERATED FROM 'kep-source\khepri_idioms_tests.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./lib/khepri-idioms"], (function(require, exports, idioms) {
    "use strict";
    var idiomsTests, sum, curried_sum, curried = idioms["curried"];
    (sum = (function(x, y) {
        return (x + y);
    }));
    (curried_sum = curried(sum));
    (idiomsTests = ({}));
    (idiomsTests.duary_sum = true);
    (idiomsTests.unary_sum = (curried_sum(1)(3) === 4));
    (exports["idiomsTests"] = idiomsTests);
    (exports["sum"] = sum);
    (exports["curried_sum"] = curried_sum);
}));