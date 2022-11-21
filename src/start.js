/**
 * reroute // reroute在整个single-spa就是负责改变app.status和执行在子应用中注册的生命周期函数。
 * formatErrorMessage 格式化异常信息
 * setUrlRerouteOnly // 路由的变化，应用是否从定向
 * isInBrowser 是否是浏览器环境
 */
import { reroute } from "./navigation/reroute.js";
import { formatErrorMessage } from "./applications/app-errors.js";
import { setUrlRerouteOnly } from "./navigation/navigation-events.js";
import { isInBrowser } from "./utils/runtime-environment.js";

// 应用启动的标志
let started = false;

// 开启的方法
/**
 * 必须在你single spa的配置中调用！在调用 start 之前, 应用会被加载, 但不会初始化，挂载或卸载。 
 * start 的原因是让你更好的控制你单页应用的性能。
 * 举个栗子，你想立即声明已经注册过的应用（开始下载那些激活应用的代码），
 * 但是实际上直到初始化AJAX（或许去获取用户的登录信息）请求完成之前不会挂载它们 。 
 * 在这个例子里，立马调用 registerApplication 方法，完成AJAX后再去调用 start方法会获得最佳性能。
 * 
 * @param {*}  opts 属性对象，可选 示例： {urlRerouteOnly: true}
 * urlRerouteOnly：默认为false的布尔值。如果设置为true，
 * 对history.pushState（）和history.replaceState（）的调用将不会触发单个spa重新定向路由，
 * 除非客户端路由已更改。在某些情况下，将此设置为true可以提高性能。有关更多信息，请阅读https://github.com/single-spa/single-spa/issues/484。
 */
export function start(opts) {
  started = true;
  if (opts && opts.urlRerouteOnly) {
    setUrlRerouteOnly(opts.urlRerouteOnly);
  }
  if (isInBrowser) {
    reroute();
  }
}

// 返回应用是否启动的boolean值
export function isStarted() {
  return started;
}

// 在浏览器环境中
if (isInBrowser) {
  setTimeout(() => {
    // 如果应用注册了，没有调用start方法，抛出异常，“single-spa应用加载5000后尚未调用start方法。。。。”
    if (!started) {
      console.warn(
        formatErrorMessage(
          1,
          __DEV__ && // 是否是开发环境
            `singleSpa.start() has not been called, 5000ms after single-spa was loaded. Before start() is called, apps can be declared and loaded, but not bootstrapped or mounted.`
        )
      );
    }
  }, 5000);
}
