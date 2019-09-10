// rough lenses for me
const view = (lens, store) => lens.view(store);

const set = (lens, value, store) => lens.set(value)(store);

const lensFor = key => ({
  view: store => store[key],
  set: value => store => ({
    ...store,
    [key]: value,
  }),
  // (a -> b) -> lens a -> lens b
  fmap: fab => store => this.set(fab(this.view(store)))(store),
});

const aStore = {};
const lensA = lensFor('a');
const lensB = lensFor('b');
const lensC = lensFor('c');

const retrieved = view(lensA, set(lensA, 'pippo', aStore));
console.log('retrieved:', retrieved);
const overridden = view(lensB, set(lensB, 'secondo', set(lensB, 'primo', aStore)));
console.log('overridden:', overridden);
const inputStraight = view(lensC, set(lensC, 'secondo', aStore));
console.log('inputStraight:', inputStraight);

const fullStore = {
  a: 'pippo',
  b: 'pluto',
  c: 'paperino',
};

const store = set(lensA, view(lensA, fullStore), fullStore);

const JS = JSON.stringify;

console.log('store: at startup and after view->setagain', JS(fullStore), JS(store));

const upperize = x => x.toUpperCase();
const enlarge = x => x.split('').join(' ');

const over = lens => f => store => set(lens, f(view(lens, store)), store);

const upperized = over(lensA)(upperize)(fullStore);
console.log('upperized:', JS(upperized));

const upperenlargize = x => upperize(enlarge(x));
const upperenlargized = over(lensA)(upperenlargize)(fullStore);

const upperizeA = over(lensA)(upperize); // store -> store
const enlargeA = over(lensA)(enlarge); // store -> store
const upperenlargizeA = x => upperizeA(enlargeA(x));
const upperenlargized2 = upperenlargizeA(fullStore);
console.log('upperenlargized:', JS(upperenlargized), JS(upperenlargized2));

const simpleStore = { a: 'paperino' };
const fmappedToUpperize = lensA.fmap(upperize).view(simpleStore);
console.log(`start: ${JS(simpleStore)}, after fmapping: ${fmappedToUpperize}`);
