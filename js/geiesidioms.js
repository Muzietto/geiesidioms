
function curried(fun){
  var result = function(value){
    if (fun.length <= 1){
      return fun(value);
    } else {
      var partial = fun.bind(undefined, value);
      return curried(partial);
    }
  }
  result.is_curried = true;
  return result;
}

///// UNARY APPLICATIVE aka (->) r //////
function unary(func){
  'use strict';
  var curriedFunc = func.is_curried ? func : curried(func);
  curriedFunc.is_functor = true;
  curriedFunc.is_applicative = true;

  /* ap aka <*>
   * <*> :: af (a -> b) -> af a -> af b
   * af (a -> b) <*> :: af a -> af b
   * af (a -> b) <*> af a :: af b
   * ATTENTION!!!: therefore, <*> has a meaning 
   * only when it belongs to an af (a -> b)
   * EXAMPLES OF af(a->b): 
   * EX1: pure(x->2*x)
   * EX2: pure(12).fmap(x->2*x)
   * EX3: pure(x->y->x+y)
   * EX4: pure(12).fmap(x->y->x+y)
   */
  // f <*> g = x -> f x (g x)
  // this <*> afa = x -> this x (afa x)
  curriedFunc.ap = function(afa){
    if (!afa.is_applicative) throw 'not an applicative!'
    return unary(function(x){
      return curriedFunc(x)(afa(x));
    });
  }

  /* fmap fab fa = x -> fab (fa x)
   * fab 'fab' fa = x -> fab (fa x)
   * fmap fab this = x -> fab (this x)
   */
  curriedFunc.fmap = function(fab) {
    return unary(function(x){
      return fab(curriedFunc(x));
    });
  }

  return curriedFunc;
}

///// MAYBE APPLICATIVE //////
function maybe(value){
  'use strict';
  var applicative = {};
  applicative.is_functor = true;
  applicative.is_applicative = true;
  applicative.is_none = false;
  applicative.is_some = true;
  applicative.value = function(){ return value; }

  applicative.fmap = function(fab){
    return maybe(fab(value));
  }
  applicative.ap = function(afa){
    if (!afa.is_applicative) throw 'not an applicative!'
    /* ap aka <*>
     * <*> :: af (a -> b) -> af a -> af b
     * af (a -> b) <*> :: af a -> af b
     * af (a -> b) <*> af a :: af b
     * ATTENTION!!!: therefore, <*> has a meaning 
     * only when it belongs to an af (a -> b)
     * that's to say value is a FUNCTION!
     */
    return maybe(value(afa.value()));
  }

  if (value === null
   || (typeof value !== 'function' && isNaN(value))
   || value === Infinity
   || typeof value === 'undefined'){
    // let's build the none 
    value = null;
    applicative.is_none = true;
    applicative.is_some = false;
    applicative.fmap = function(){
      return applicative;
    }
    applicative.ap = function(afa){
      return applicative;
    }
  }
  return applicative;
};

//////// LIST APPLICATIVE ///////////
function list(){ // variadic
  var args = Array.prototype.slice.apply(arguments);
  var applicative = {};
  applicative.is_functor = true;
  applicative.is_applicative = true;
  applicative.fmap = function(/*fabs*/) { // unary
    var fabs = Array.prototype.slice.apply(arguments);
    var nextArgs = fabs.reduce(function(acc, curr){ 
      return acc.concat(args.map(curr));
    }, []);
    return list.apply(null, nextArgs);
  }
  applicative.ap = function(afa){
    if (!afa.is_applicative) throw 'not an applicative!'
    // gotta preserve multiple args
    return afaFmap.apply(null, args);
    function afaFmap(/*mappingFunctions*/){
      var mappingFunctions = Array.prototype.slice.apply(arguments);
      return afa.fmap.apply(null, mappingFunctions);
    }
  }
  applicative.length = args.length;
  applicative.get = function(pos) { return args[pos]; }
  applicative.toString = function(){ return args.reduce(function(a, c){ return a + c + ','}, '[').replace(/,$/, ']'); }
  return applicative;
};

