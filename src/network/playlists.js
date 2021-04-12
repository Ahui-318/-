// palylist.vue 的数据
import { request } from "./request";

// 头部的数据
export function getPlayLists(options) {
  return request({
    url: '/top/playlist/highquality',
    params: {
      limit: 1,
      cat: '全部'

    }
  })
}
// 用于分页的歌单数据
export function getTagLists(options) {
  return request({
    url: '/top/playlist',
    params:{
      limit: options.num,
      offset: options.set,
      cat: options.cat,
    },
  })
}
