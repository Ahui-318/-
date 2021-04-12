import { request } from "./request";

export function getRecommend(limit) {
  return request({
    url: '/personalized',
    params: {
      limit: 10
    }
  })
};



