var result = 0; // 최상위 스코프
var count = 0; // 최상위 스코프

function add(x, y) { // 최상위 스코프
  result = x + y;
  count++;
  return result;
}

function subtract(x, y) { // 최상위 스코프
  result = x - y;
  count++;
  return result;
}

function multiply(x, y) { // 최상위 스코프
  result = x * y;
  count++;
  return result;
}

function divide(x, y) { // 최상위 스코프
  result = x / y;
  count++;
  return result;
}

function average() { // 최상위 스코프
  return result / count;
}

console.log(add(3, 5));