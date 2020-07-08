import request from "@/utils/request";

export function getEmpList(params) {
  return request({
    url: '/sys/emp/getEmpList',
    method: 'get',
    params
  })
}
