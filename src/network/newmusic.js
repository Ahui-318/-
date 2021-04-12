// 获取 发现页面最新歌曲模块的数据
import { request } from "./request";

export function getNew() {
  return request({
    url:'/personalized/newsong',
  })
}


// 获取  播放音乐的音频数据

export function getMusic(id) {
  return request({
    url:'song/url',
    params:{
      id
    }
  })
}
