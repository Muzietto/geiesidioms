/*
 * THIS FILE IS AUTO GENERATED FROM 'kep-source\lib\khepri-idioms.kep'
 * DO NOT EDIT
*/
define(["require", "exports"], (function(require, exports) {
    "use strict";
    var curried, list;
    (curried = (function(fun) {
        return (function(value) {
            return ((fun.length <= 1) ? fun(value) : curried(fun.bind(undefined, value)));
        });
    }));
    (exports["curried"] = curried);
    (exports["list"] = list);
}));