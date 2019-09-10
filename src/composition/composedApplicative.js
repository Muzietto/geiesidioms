
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
    // eslint-disable-next-line no-unused-vars
    ap: mfa_bc => null,
  };
}
