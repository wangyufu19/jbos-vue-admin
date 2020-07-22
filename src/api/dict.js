import request from "@/utils/request";

export function getDictTypeList(params) {
  return request({
    url: '/sys/dict/getDictTypeList',
    method: 'get',
    params
  })
}

export function getDictCodeList(params) {
  return request({
    url: '/sys/dict/getDictCodeList',
    method: 'get',
    params
  })
}
