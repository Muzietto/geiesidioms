// http://etorreborre.blogspot.com/2011/06/essence-of-iterator-pattern.html
import Maybe from '@src/lib/maybe';

const pricer = market =>
  ((market.isOpen)
    ? Maybe.of(maybeFruit => ((maybeFruit.isJust)
      ? Maybe.of(market[maybeFruit.get()])
      : Maybe.Nothing()))
    : Maybe.Nothing());

const maybePricer = pricer({ isOpen: true, orange: 123 });
const noPricer = pricer({ isOpen: false, orange: 123 });

const applic = maybeFunc => ({
  // F[a => b] => F[A] => F[B]
  apply: fa => ((maybeFunc.isJust) ? Maybe.of(maybeFunc.get()(fa)) : Maybe.Nothing()),
});

export const maybePrice = applic(maybePricer)
  .apply(Maybe.of('orange'));
export const noPrice = applic(noPricer)
  .apply(Maybe.of('orange'));

const traverse = famb => tree =>
  ((tree.isLeaf)
    ? Maybe.pure(Leaf).ap(famb(tree.value))
    : Maybe.pure(Node).ap(traverse(famb)(tree.left)).ap(traverse(famb)(tree.right)));

const disney = Node(Leaf('pippo'))(Node(Leaf('pluto'))(Leaf('paperino')));
const killPluto = name => ((name !== 'pluto') ? Maybe.of(name) : Maybe.Nothing());
const killMinnie = name => ((name !== 'minnie') ? Maybe.of(name) : Maybe.Nothing());

export const traversed1 = traverse(killPluto)(disney);
export const traversed2 = traverse(killMinnie)(disney);

function Node(left) {
  return right => ({
    left,
    right,
    isLeaf: false,
    isNode: true,
  });
}

function Leaf(value) {
  return {
    value,
    isLeaf: true,
    isNode: false,
  };
}
