// 节流函数
export function throttle(fn, time) {
  let startTime = new Date();//初始时间
  return function () {
    let time_ = (new Date() - startTime) >= time;//判断时间间隔是否大于传入的time值，返回布尔值
    if (time_) {
      fn.apply(this);
      startTime = new Date();//函数执行完后更新初始时间的值
    }
  }
}