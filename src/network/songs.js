// 最新音乐数据
import { request } from "./request";
// import { throttle } from "@/utils/throttle";

export function getSongs(config) {
  return request({
    url: 'top/song',
    params: {
      type: config.type,
    }
  })
}

