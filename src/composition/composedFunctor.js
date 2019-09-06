
export default ComposedFunctor();

function ComposedFunctor() {
  return {
    fmap: function(fab) {
      return x => {
        return (x.fmap)
          ? x.fmap(this.fmap(fab))
          : fab(x);
      };
    },
  };
}
