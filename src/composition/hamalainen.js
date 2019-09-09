// https://carlo-hamalainen.net/2014/01/02/applicatives-compose-monads-do-not/

Array.prototype.fmap = Array.prototype.map;

export function functor(fmap) {
  return {
    fmap,
  };
}

export function composedFunctorH(fa, fb) {
  return {
    fmap: f => fa.prototype.fmap(fb.prototype.fmap(f)),
  };
}

// try af1.compose(af2)
export function composedApplicativeH(af1, af2) {
  return {
    pure: a => af1.pure(af2.pure(a)),
    // m (a => b) -> m a -> m b
    ap: null,
  };
}
