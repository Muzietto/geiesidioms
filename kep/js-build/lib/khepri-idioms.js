/*
 * THIS FILE IS AUTO GENERATED FROM 'kep-source\lib\khepri-idioms.kep'
 * DO NOT EDIT
*/
define(["require", "exports"], (function(require, exports) {
    "use strict";
    var curried, list, fmap, ap, __lt_quest_gt, __lt_star_gt;
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
    (fmap = (function(func1) {
        return (function(func2) {
            return func1.fmap(func2);
        });
    }));
    (__lt_quest_gt = fmap);
    (ap = (function(appl1) {
        return (function(appl2) {
            return appl1.ap(appl2);
        });
    }));
    (__lt_star_gt = ap);
    (exports["curried"] = curried);
    (exports["list"] = list);
    (exports["fmap"] = fmap);
    (exports["ap"] = ap);
    (exports["<?>"] = __lt_quest_gt);
    (exports["<*>"] = __lt_star_gt);
}));