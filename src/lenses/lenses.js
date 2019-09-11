// rough lenses for me
const view = (lens, store) => lens.view(store);

const set = (lens, value, store) => lens.set(value)(store);

const over = lens => f => store => set(lens, f(view(lens, store)), store);

const lensFor = (key, viewFun, setFun) => {
  const result = {
    key,
    view: viewFun || (store => store[key]),
    set: setFun || (value => store => ({
      ...store,
      [key]: value,
    })),
    // (a -> b) -> lens a -> lens b
    fmap: fab => lensFor(key, store => fab(result.view(store))),
    // lens -> lens -> lens
    compose: lens => lensFor(
      lens.key,
      store => lens.view(result.view(store)),
      value => store => result.set(value)(store)
      //          [key]: lens.set(value)(store[lens.key]),
    ),
  };
  return result;
};

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

const storez = set(lensA, view(lensA, fullStore), fullStore);

const JS = JSON.stringify;

console.log('store: at startup and after view->setagain', JS(fullStore), JS(storez));

const upperize = x => x.toUpperCase();
const enlarge = x => x.split('').join(' ');

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
console.log(`start: ${lensA.view(simpleStore)}, after fmapping: ${fmappedToUpperize}`);
const fmappedToUpperizeAndEnlarge = lensA.fmap(upperize).fmap(enlarge).view(simpleStore);
console.log(`start: ${lensA.view(simpleStore)}, after fmapping: ${fmappedToUpperizeAndEnlarge}`);

const nestedStore = { a: { b: 'nested paperino' } };
const nestedStoreB = { a: { c: { d: 'deeply nested paperino' } } };
const lensA_B = lensA.compose(lensB);
console.log(`nested search a.b ${lensA_B.view(nestedStore)}`);
const lensA_C_D = lensA.compose(lensFor('c')).compose(lensFor('d'));
console.log(`deeply nested search a.c.d ${lensA_C_D.view(nestedStoreB)}`);
const modifiedAB = lensA_B.set('nested topolino')(nestedStore);
console.log(`nested modification a.b ${JS(modifiedAB)}`);
const modifiedACD = lensA_C_D.set('deeply nested topolino')(nestedStoreB);
console.log(`deeply nested modification a.c.d ${JS(modifiedACD)}`);

const bigNest = { a: { b: { c: { d: { e: 'troglodita' } } } } };
const bigLens = lensFor('a')
  .compose(lensFor('b'))
  .compose(lensFor('c'))
  .compose(lensFor('d'))
  .compose(lensFor('e'));
const inTheNest = bigLens.view(bigNest);
const changedNest = bigLens.set('fred flinstone')(bigNest);
console.log(`deeply nested search a.b.c.d.e ${inTheNest}`);
console.log(`deeply nested modification a.b.c.d.e ${JS(changedNest)}`);
