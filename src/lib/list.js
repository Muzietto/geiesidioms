export default List;

// -- Aliases ----------------------------------------------------------
// eslint-disable-next-line no-unused-vars
const clone = Object.create;

// eslint-disable-next-line no-unused-vars
function unimplemented() {
  throw new Error('Not implemented.');
}

// eslint-disable-next-line no-unused-vars
function noop() {
  return this;
}

function List() {
}

List.prototype = {};

List.of = function(arra) {
  const result = [...arra];
  result.prototype = List.prototype;
  return result;
};

List.prototype.map = function(fab) {
  return x => Array.prototype.map.call(x, fab);
};

List.prototype.fmap = List.prototype.map;

List.prototype.pure = List.of;

// [a -> b] -> [a] -> [b]
// List.prototype.ap = mfab => fa => null;
