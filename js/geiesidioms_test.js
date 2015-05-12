var expect = chai.expect;

describe('applicatives (aka idioms) in JavaScript', function () {
  describe('may be lists that',function(){
    describe('should contain all possible combinations of inputs',function(){
      it('using unary functions',function(){
        var aaa = list(
          function(x){ return x * 2; },
          function(x){ return x + 100; },
          function(x){ return x * x; }
        );
        var bbb = aaa.ap(list(1,2,3));
        expect(bbb.get(0)).to.be.equal(2);
        expect(bbb.get(3)).to.be.equal(101);
        expect(bbb.get(8)).to.be.equal(9);
      });
      it('using curried n-ary functions',function(){
        var aaa = list(
          curried(function(x, y){ return x + y; }),
          curried(function(x, y){ return x * y; })
        );
        var bbb = aaa.ap(list(1,2));
        var ccc = bbb.ap(list(3,4));
        expect(ccc.toString()).to.be.equal('[4,5,5,6,3,4,6,8]');
      });
    });
    describe('should allow applicative style',function(){
      it('using fmap along the way',function(){
        var curriedConcat = curried(function(xs, ys){ return xs.concat(ys); });

        var aaa = list('ha','hem','hmm')
           .fmap(curriedConcat)
           .ap(list('?','!','.'));
        expect(aaa.toString()).to.be.equal('[ha?,ha!,ha.,hem?,hem!,hem.,hmm?,hmm!,hmm.]');
      });
      // TODO - implement a case app1.ap(app2).fmap(functs).ap(app3)
    });
  });

  describe('may be maybes that',function(){
    it('behave as applicatives',function(){
      var curriedMultiplier = curried(function(x, y){ return x * y; });
      var curriedSubtractor = curried(function(x, y){ return x - y; });

      // some(4).fmap(x -> y -> x*y) -> some(y -> 4*y)
      var someQuadrupler = maybe(4).fmap(curriedMultiplier);
      // some(y -> 4*y) <*> some(2) -> some(8)
      var some8 = someQuadrupler.ap(maybe(2));
      expect(some8.value()).to.be.equal(8);

      // some(x -> y -> x*y) <*> some(2) <*> some(3) -> some(6)
      var someDoubler = maybe(curriedMultiplier).ap(maybe(2));
      var some6 = someDoubler.ap(maybe(3));
      expect(some6.value()).to.be.equal(6);
      
      // some(x -> y -> x-y) <*> some(2) <*> some(3) -> some(-1)
      var someMinus2 = maybe(curriedSubtractor).ap(maybe(2));
      var someNegative1 = someMinus2.ap(maybe(3));
      expect(someNegative1.value()).to.be.equal(-1);
    });
    it('smoothly take care of nones',function(){
      var curriedDivider = curried(function(x, y){ return y / x; }, 2);

      // some('abc').fmap(x -> y -> y/x) -> none
      var hopeless1 = maybe('abc').fmap(curriedDivider);
      // none <*> some(2) -> none
      var hopeless2 = hopeless1.ap(maybe(2));
      expect(hopeless2.is_none).to.be.true;

      // some(x -> y -> y/x) <*> some(0) <*> some(3) -> none
      var zeroDivisorNone = maybe(curriedDivider).ap(maybe(0));
      var hopeless3 = zeroDivisorNone.ap(maybe(3));
      expect(hopeless3.is_none).to.be.true;
    });
  });
  describe('may be unary/curried wholesome JS functions',function(){
    beforeEach(function () {
      this.plus2 = unary(function(x){ return x + 2; });
      this.times3 = unary(function(x){ return x * 3; });
      this.invert = unary(function(x){ return 1 / x; });
    });
    it('that can be fmapped into function compositions',function(){
      var plus2 = unary(function(x){ return x + 2; });
      var times3 = unary(function(x){ return x * 3; });
      var invert = unary(function(x){ return 1 / x; });

      var chain0 = plus2.fmap(times3); // x -> 3 * (2+x)
      expect(chain0(5)).to.be.equal(21); // 3 * (2+5)
      var chain1 = chain0.fmap(this.invert);
      expect(chain1(5)).to.be.equal(1/21); // 1 / (3 * (2+5))

      var chain2 = invert.fmap(times3).fmap(plus2); // 2 + (3 * (1/5))
      expect(chain2(5)).to.be.equal(2.6); // don't try this with 0!!
    });

    it('that allow chains in applicative style',function(){
      // THIS SHALL BE DONE
      // (*) <$> (+3) <*> (*2) $ 2 
      // plus3.fmap(product).ap(times2)(2)
      // http://stackoverflow.com/questions/23924540/simple-applicative-functor-example
      var plus3 = unary(function(x){ return x + 3; });
      var times2 = unary(function(x){ return x * 2; });
      var product = unary(function(x, y){ return x * y; });

      var sss = plus3.fmap(product);
      var chain = sss.ap(times2);
      expect(chain(2)).to.be.equal(20);

      var add = unary(function(x, y){ return x + y; });
      // times2 becomes y
      var chain2 = add.ap(times2);
      expect(chain2(3)).to.be.equal(9); // 3 + 3*2
      expect(chain2(4)).to.be.equal(12); // 4 + 4*2

      var subtract = unary(function(x, y){ return x - y; });
      // times2 becomes y
      var chain2b = subtract.ap(times2);
      expect(chain2b(3)).to.be.equal(-3); // 3 - 3*2
      expect(chain2b(4)).to.be.equal(-4); // 4 - 4*2

      var addThenSubtract = unary(function(x, y, z){ return x + y - z; });
      // times2 becomes y; plus3 becomes z
      var chain3 = addThenSubtract.ap(times2).ap(plus3);
      expect(chain3(-4)).to.be.equal(-11); // -4 + (-4*2) - (-4+3)
      expect(chain3(-3)).to.be.equal(-9); // 
      expect(chain3(-2)).to.be.equal(-7); // 
      expect(chain3(-1)).to.be.equal(-5); // 
      expect(chain3(0)).to.be.equal(-3); // 0 + (0*2) - (0+3)
      expect(chain3(1)).to.be.equal(-1); // 1 + (1*2) - (1+3)
      expect(chain3(2)).to.be.equal(1); // 2 + (2*2) - (2+3)
      expect(chain3(3)).to.be.equal(3); // 3 + (3*2) - (3+3)
      expect(chain3(4)).to.be.equal(5); // 4 + (4*2) - (4+3)

      // plus3 becomes y; times2 becomes z
      var chain4 = addThenSubtract.ap(plus3).ap(times2);
      expect(chain4(0)).to.be.equal(3); // 0 + (0+3) - (0*2)
      expect(chain4(1)).to.be.equal(3); // 1 + (1+3) - (1*2)
      expect(chain4(2)).to.be.equal(3); // 2 + (2+3) - (2*2)
      expect(chain4(3)).to.be.equal(3); // 
      expect(chain4(4)).to.be.equal(3); // 
    });
    it('...and I mean REAL complex chains',function(){
      var plus3 = unary(function(x){ return x + 3; });
      var minus2 = unary(function(x){ return x - 2; });
      var times3 = unary(function(x){ return x * 3; });
      var product = unary(function(x, y){ return x * y; });
      var sum = unary(function(x, y){ return x + y; });
      var diff = unary(function(x, y){ return x - y; });

      // x -> (x-2) + (x*3)
      var fff = minus2.fmap(sum).ap(times3);
      expect(fff(10)).to.be.equal(38); // 8 + 30
      // x -> (x+3) * [(x-2) + (x*3)]
      var ccchain = plus3.fmap(product).ap(fff);
      expect(ccchain(0)).to.be.equal(-6); // 3 * (-2 + 0)
      expect(ccchain(10)).to.be.equal(13*38); // 13 * (8 + 30)      

      // x -> (x-2) - (x*3)
      var fff2 = minus2.fmap(diff).ap(times3);
      expect(fff2(10)).to.be.equal(-22); // 8 - 30
      // x -> (x+3) * [(x-2) - (x*3)]
      var ccchain2 = plus3.fmap(product).ap(fff2);
      expect(ccchain2(0)).to.be.equal(-6); // 3 * (-2 - 0)
      expect(ccchain2(10)).to.be.equal(13*(-22)); // 13 * (8 - 30)      
    });
  });
});
