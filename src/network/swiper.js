import { request } from "./request";

// 获取轮播图信息
export  function getSwiper(param) {
  return request({
    url: '/banner'
  })
}

