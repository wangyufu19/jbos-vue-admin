import request from "@/utils/request";

export function getDepList(params) {
  return request({
    url: '/sys/dep/getDepList',
    method: 'get',
    params
  })
}
