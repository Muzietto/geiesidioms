// rough lenses for me
const view = (lens, store) => lens.view(store);

const set = (lens, value, store) => lens.set(value, store);

const lensFor = key => ({
  view: store => store[key],
  set: (value, store) => ({
    ...store,
    [key]: value,
  }),
});

const aStore = {};
const lensA = lensFor('a');
const lensB = lensFor('b');
const lensC = lensFor('c');

export const retrieved = view(lensA, set(lensA, 'pippo', aStore));
export const overridden = view(lensB, set(lensB, 'secondo', set(lensB, 'primo', aStore)));
export const inputStraight = view(lensC, set(lensC, 'secondo', aStore));

export const fullStore = {
  a: 'pippo',
  b: 'pluto',
  c: 'paperino',
};

export const store = set(lensA, view(lensA, fullStore), fullStore);

const upperize = x => x.toUpperCase();
const enlarge = x => x.split('').join(' ');

const over = lens => f => store => set(lens, f(view(lens, store)), store);

export const upperized = over(lensA)(upperize)(fullStore);

const upperenlargize = x => upperize(enlarge(x));
export const upperenlargized = over(lensA)(upperenlargize)(fullStore);

const upperizeA = over(lensA)(upperize);
const enlargeA = over(lensA)(enlarge);
const upperenlargizeA = x => upperizeA(enlargeA(x));
export const upperenlargized2 = upperenlargizeA(fullStore);
