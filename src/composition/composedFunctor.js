
export default ComposedFunctor();

function ComposedFunctor() {
  return {
    fmap: fab => x => {
      return x.fmap(y => {
        return y.fmap(fab);
      });
    },
    xfmap: function(fab) {
      return x => {
        return (x.fmap)
          ? x.xfmap(this.xfmap(fab))
          : fab(x);
      };
    },
  };
}
