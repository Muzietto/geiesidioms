
define([
  'require', 
  'exports', 
  'chai', 
  './js-build/lib/khepri-idioms',
  './js-build/khepri_idioms_tests'
  ], (function(require, exports, chai, lambda, tests) {
    "use strict";
    
  var expect = chai.expect,
    idiomsSuite = tests.idiomsTests,
    listSuite = tests.listTests
    ;
    
  describe('an implementation of idioms in khepri',function(){

    describe('contains a lot of tests',function(){
      for (var testcase in idiomsSuite){
        (function(tc) {
          it(tc,function(){
            expect(idiomsSuite[testcase]).to.be.ok;
          });
        })(testcase);
      }
    });

    describe('contains tests about lists',function(){
      for (var testcase in listSuite){
        (function(tc) {
          it(tc,function(){
            expect(listSuite[tc]).to.be.ok;
          });
        })(testcase);
      }
    });


  });
}));