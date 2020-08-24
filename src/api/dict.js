import request from "@/utils/request";

export function getCacheDictCodeList(params) {
  return request({
    url: '/sys/dict/getCacheDictCodeList',
    method: 'get',
    params
  })
}

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

export function saveDictCode(data) {
  return request({
    url: '/sys/dict/saveDictCode',
    method: 'post',
    data
  })
}

