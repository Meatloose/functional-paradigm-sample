var curry = require('ramda').curry;

var split = curry(function(what, str) {
  return str.split(what);
});

var map = curry(function(fn, ary) {
  return ary.map(fn);
});

var filter = curry(function(fn, ary) {
  return ary.filter(fn);
});

var match = curry(function(what, str) {
  return str.match(what);
});

var reduce = curry(function(fn, init, ary) {
  return ary.reduce(fn, init);
});

var slice = curry(function(start, end, ary) {
  return ary.slice(start, end);
});

var words = split(' ');
console.log('words:', words('hello world'));

var sentences = map(words);
console.log(sentences(["Jingle bells Batman smells", "Robin laid an egg"]));

var filterQs = filter(match(/q/i));
console.log('filterQs:', filterQs(['quick', 'camels', 'quarry', 'over', 'quails']));

var _keepHighest = function(x, y) {
  return x >= y ? x : y;
};
var max = reduce(_keepHighest, -Infinity);
console.log('max:', max([323, 523, 554, 123, 5234]));

console.log('slice:', slice(0)(2)(['a', 'b', 'c']));

var take = slice(0);
console.log('take:', take(2)(['a', 'b', 'c']));
