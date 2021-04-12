import { request } from "./request";

// 获取推荐Mv
export function getMvs() {
  return request({
    url:'personalized/mv'
  })
}
