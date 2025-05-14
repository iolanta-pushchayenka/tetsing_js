"use strict";

var arrowFunc = function arrowFunc() {
  var x = [1, 2, 3];
  return x === null || x === void 0 ? void 0 : x[0]; 
};
console.log(arrowFunc());
