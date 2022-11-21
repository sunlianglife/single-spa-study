// Object.assign() is not available in IE11. And the babel compiled output for object spread
// Object.assign() 在ie11不可用，并且babel编译的输出只适用object
// syntax checks a bunch of Symbol stuff and is almost a kb. So this function is the smaller replacement.
// 语法检查一堆Symbol内容，几乎是一kb。所以这个函数是较小的替换。
export function assign() {
  for (let i = arguments.length - 1; i > 0; i--) {
    for (let key in arguments[i]) {
      if (key === "__proto__") {
        continue;
      }
      arguments[i - 1][key] = arguments[i][key];
    }
  }

  return arguments[0];
}
