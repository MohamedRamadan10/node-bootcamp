// console.log(require("module").wrapper);

const calc1 = require("./module-test-1");
const addCalc = new calc1();
console.log(addCalc.add(1, 7));

const { add, multi } = require("./module-test-2");
console.log(add(5, 6), multi(10, 2));

require("./module-test-3")();
require("./module-test-3")();
require("./module-test-3")();
require("./module-test-3")();
