
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
        it(testcase,function(){
            expect(idiomsSuite[testcase]).to.be.ok;
        });
      }
    });

    describe('contains tests about lists',function(){
      for (var testcase in listSuite){
        it(testcase,function(){
            expect(listSuite[testcase]).to.be.ok;
        });
      }
    });


  });
}));