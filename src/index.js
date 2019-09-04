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
} from '@src/lenses/torreborre';

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
