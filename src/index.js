import Maybe from '@src/lib/maybe';
import composedFunctor from '@src/composition/composedFunctor';
import composedApplicative from '@src/composition/composedApplicative';
import {
  store,
  fullStore,
  upperized,
  retrieved,
  overridden,
  inputStraight,
  upperenlargized,
  upperenlargized2,
} from '@src/lenses/lenses';
import {
  maybePrice,
  noPrice,
  traversed1,
  traversed2,
} from '@src/composition/torreborre';

Array.prototype.fmap = Array.prototype.map;

Array.prototype.rfmap = function(fab) {
  return this.map(x => {
    return (x.rfmap)
      ? x.rfmap(this.map(fab))
      : fab(x);
  });
};

const maybes2 = [Maybe.of(12), Maybe.Nothing(), Maybe.of(23)];

const incrementeds = composedFunctor.fmap(x => x + 1)(maybes2);
console.log(incrementeds);

// eslint-disable-next-line no-unused-vars
const xxx = composedApplicative.pure(x => y => x + y);

// cagata pazzesca...
const revolutionary = maybes2.rfmap(x => x + 1);
console.log('(wrong) REVOLUTIONARY!!:', revolutionary);

console.log('oranges price with market open', maybePrice);
console.log('oranges price with market closed', noPrice);
console.log('traverse encountering a Nothing', traversed1);
console.log('traverse without encountering a Nothing', traversed2);

function cons(car, cdr) {
  return [car].concat(cdr);
}
