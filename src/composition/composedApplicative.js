
export default ComposedApplicative();

function ComposedApplicative() {
  return {
    // (a -> b) -> m a -> m b
    fmap: fab => x => {
      return x.fmap(y => {
        return y.fmap(fab);
      });
    },
    // a -> m a
    pure: null,
    // m (a -> bc) -> m a -> m bc
    ap: mfa_bc => null,
  };
}
