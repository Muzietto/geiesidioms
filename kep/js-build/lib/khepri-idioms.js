/*
 * THIS FILE IS AUTO GENERATED FROM 'kep-source\lib\khepri-idioms.kep'
 * DO NOT EDIT
*/
define(["require", "exports"], (function(require, exports) {
    "use strict";
    var curried, list;
    (curried = (function(fun) {
        return (function(value) {
            return ((fun.length <= 1) ? fun(value) : curried(fun.bind(null, value)));
        });
    }));
    (list = (function() {
        var __args = arguments,
            args = [].slice.call(__args, 0);
        return ({
            is_functor: true,
            is_applicative: true,
            fmap: (function() {
                var __args0 = arguments,
                    fabs = [].slice.call(__args0, 0),
                    x = list,
                    y = fabs.reduce((function(acc, curr) {
                        return acc.concat(args.map(curr));
                    }), []);
                return x.apply(null, y);
            }),
            ap: (function(afa) {
                var y = afa.fmap;
                return y.apply(null, args);
            }),
            get: (function(index) {
                return args[index];
            }),
            toString: (function(_) {
                return (("[" + args.toString()) + "]");
            })
        });
    }));
    (exports["curried"] = curried);
    (exports["list"] = list);
}));