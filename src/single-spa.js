export { start } from "./start.js"; // 启动的方法
export { ensureJQuerySupport } from "./jquery-support.js"; // 确保jquery支持，可以外部传入

export {
  setBootstrapMaxTime, // 全局配置初始化超时时间。
  setMountMaxTime, // 全局配置挂载超时时间。
  setUnmountMaxTime, // 全局配置卸载超时时间
  setUnloadMaxTime, // 全局配置移除超时时间。
} from "./applications/timeouts.js";

export {
  registerApplication, // 注册子应用的方法
  unregisterApplication, // 卸载子应用
  getMountedApps, // 返回当前已经挂载的子应用的名称
  getAppStatus, // 参数：注册应用的名字，返回：应用的状态
  unloadApplication, // 移除已注册的应用
  checkActivityFunctions, // 将会调用每个应用的 mockWindowLocation 并且返回一个根据当前路判断那些应用应该被挂载的列表。
  getAppNames, // 获取应用的名称(任何状态)
  pathToActiveWhen, // 判断应用的前缀url，返回：boolean
} from "./applications/apps.js";
export { navigateToUrl } from "./navigation/navigation-events.js"; // 实现在不同注册应用之前的切换
export { triggerAppChange } from "./navigation/reroute.js"; // 返回一个Promise对象，当所有应用挂载/卸载时它执行 resolve/reject 方法，它一般被用来测试single-spa，在生产环境可能不需要。
export {
  addErrorHandler, // 添加异常处理，抛出错误
  removeErrorHandler, // 删除给定的错误处理程序函数
} from "./applications/app-errors.js";
export { mountRootParcel } from "./parcels/mount-parcel.js"; // 将会创建并挂载一个 single-spa parcel.

// 应用的状态，已备注到app.helpers.js中
export {
  NOT_LOADED,
  LOADING_SOURCE_CODE,
  NOT_BOOTSTRAPPED,
  BOOTSTRAPPING,
  NOT_MOUNTED,
  MOUNTING,
  UPDATING,
  LOAD_ERROR,
  MOUNTED,
  UNMOUNTING,
  SKIP_BECAUSE_BROKEN,
} from "./applications/app.helpers.js";

import devtools from "./devtools/devtools"; // 暴露的方法集合
import { isInBrowser } from "./utils/runtime-environment.js"; // 判断浏览器环境

// 暴露的方法集合
// window.__SINGLE_SPA_DEVTOOLS__  single-spa在window中挂载的变量
if (isInBrowser && window.__SINGLE_SPA_DEVTOOLS__) {
  window.__SINGLE_SPA_DEVTOOLS__.exposedMethods = devtools;
}
