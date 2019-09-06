import Maybe from '@src/lib/maybe';
import List from '@src/lib/list';
import composedFunctor from '@src/composition/composedFunctor';
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

const incrementeds2 = composedFunctor.fmap(x => x + 1)([1, 2, 3]);
console.log(incrementeds2);

const incrementeds3 = composedFunctor.fmap(x => x + 1)(Maybe.of(maybes2));
console.log(incrementeds3);

const revolutionary = maybes2.rfmap(x => x + 1);
console.log('REVOLUTIONARY!!:', revolutionary);

console.log('store: at startup and after view->setagain', JSON.stringify(fullStore), JSON.stringify(store));
console.log('upperized:', JSON.stringify(upperized));
console.log('upperenlargized:', JSON.stringify(upperenlargized),
  JSON.stringify(upperenlargized2));

console.log('retrieved:', retrieved);
console.log('overridden:', overridden);
console.log('inputStraight:', inputStraight);

console.log('oranges price with market open', maybePrice);
console.log('oranges price with market closed', noPrice);
console.log('traverse encountering a Nothing', traversed1);
console.log('traverse without encountering a Nothing', traversed2);
