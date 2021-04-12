import { request } from "./request";

export function getNewMvs(config) {
  return request({
    url: '/mv/all',
    params:{
      area: config.area,
      type: config.type,
      order: config.order,
      limit: config.limit,
      offset: config.offset,
    }
  })
}





