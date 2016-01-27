var _ = require('ramda');
var accounting = require('accounting');

var add = _.curry(function(x, y) {
  return x + y;
});

var map = _.curry(function(fn, ary) {
  return ary.map(fn);
});

var reduce = _.curry(function(fn, init, ary) {
  return ary.reduce(fn, init);
});

var toLowerCase = _.curry(function(str) {
  return str.toLowerCase();
});

var replace = _.curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

var join = _.curry(function(what, ary) {
  return ary.join(what);
});

var CARS = [{
  name: "Ferrari FF",
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true
}, {
  name: "Spyker C12 Zagato",
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false
}, {
  name: "Jaguar XKR-S",
  horsepower: 550,
  dollar_value: 132000,
  in_stock: false
}, {
  name: "Audi R8",
  horsepower: 525,
  dollar_value: 114200,
  in_stock: false
}, {
  name: "Aston Martin One-77",
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true
}, {
  name: "Pagani Huayra",
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: false
}];

var isLastInStock = _.compose(_.prop('in_stock'), _.last);
console.log('isLastInStock:', isLastInStock(CARS));

var nameOfFirstCar = _.compose(_.prop('name'), _.head);
console.log('nameOfFirstCar:', nameOfFirstCar(CARS));

var _average = function(xs) {
  return reduce(add, 0, xs) / xs.length;
};
var averageDollarValue = _.compose(_average, map(_.prop('dollar_value')));
console.log('averageDollarValue:', averageDollarValue(CARS));

var _underscore = replace(/\W+/g, '_');
var sanitizeNames = _.map(_.compose(_underscore, toLowerCase, _.prop('name')));
console.log('sanitizeNames:', sanitizeNames(CARS));


var formatPrice = _.compose(accounting.formatMoney, _.prop('dollar_value'));
var availablePrices = _.compose(join(','), map(formatPrice), _.filter(_.prop('in_stock')));
console.log('availablePrices:', availablePrices(CARS));


var fastestCar = _.compose(_.flip(_.concat)(' is the fastest'), _.prop('name'), _.last, _.sortBy(_.prop('horsepower')));
console.log('fastestCar:', fastestCar(CARS));

