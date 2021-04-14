import { request } from "./request";

// 获取推荐Mv
export function getMvs() {
  return request({
    url:'personalized/mv'
  })
}

// 获取MV播放地址
export function getMv(id) {
  return request({
    url:'/mv/url',
    params:{
      id
    }
  })
}

//获取MVdetail
export function getMvDetail(mvid) {
  return request ({
    url: '/mv/detail',
    params:{
      mvid
    }
  })
}

// 获取相关mv
export function getSimiMv(mvid) {
  return request({
    url:'/simi/mv',
    params:{
      mvid
    }
  })
}

// 获取评论
export function getMvComment(params) {
  return request({
    url:'/comment/mv',
    params
  })
}
