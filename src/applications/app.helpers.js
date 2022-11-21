import { handleAppError } from "./app-errors.js";

// App statuses
export const NOT_LOADED = "NOT_LOADED"; // single-spa应用注册了，还未加载。
export const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE"; // 应用代码正在被拉取。
export const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED"; // 应用已经加载，还未初始化。
export const BOOTSTRAPPING = "BOOTSTRAPPING"; // 生命周期函数已经执行，还未结束。
export const NOT_MOUNTED = "NOT_MOUNTED"; // 应用已经加载和初始化，还未挂载
export const MOUNTING = "MOUNTING"; // 应用正在被挂载，还未结束。
export const MOUNTED = "MOUNTED"; // 应用目前处于激活状态，已经挂载到DOM元素上。
export const UPDATING = "UPDATING"; // 更新中
export const UNMOUNTING = "UNMOUNTING"; // 应用正在被卸载，还未结束
export const UNLOADING = "UNLOADING"; // 应用正在被移除，还未结束
export const LOAD_ERROR = "LOAD_ERROR"; // 应用的加载功能返回了一个rejected的Promise。这通常是由于下载应用程序的javascript包时出现网络错误造成的。Single-spa将在用户从当前路由导航并返回后重试加载应用。
export const SKIP_BECAUSE_BROKEN = "SKIP_BECAUSE_BROKEN"; // 应用在加载、初始化、挂载或卸载过程中抛出错误，由于行为不当而被跳过，因此被隔离。其他应用将正常运行。

// 应用是否加载完毕
export function isActive(app) {
  return app.status === MOUNTED;
}

// 当前路由关联的子应用是否激活
export function shouldBeActive(app) {
  try {
    return app.activeWhen(window.location);
  } catch (err) {
    handleAppError(err, app, SKIP_BECAUSE_BROKEN);
    return false;
  }
}

// 返回应用的名称
export function toName(app) {
  return app.name;
}

// 是否为Parcel模式
export function isParcel(appOrParcel) {
  return Boolean(appOrParcel.unmountThisParcel);
}

// 区分single-spa的两种模式 parcel || application
export function objectType(appOrParcel) {
  return isParcel(appOrParcel) ? "parcel" : "application";
}
