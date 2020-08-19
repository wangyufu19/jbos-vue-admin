import request from "@/utils/request";


export function getFuncChildrenNode(params) {
  return request({
    url: '/sys/func/getFuncChildrenNode',
    method: 'get',
    params
  })
}

export function getFuncTree(params) {
  return request({
    url: '/sys/func/getFuncTree',
    method: 'get',
    params
  })
}
export function getFuncList(params) {
  return request({
    url: '/sys/func/getFuncList',
    method: 'get',
    params
  })
}
export function addFunc(data) {
  return request({
    url: '/sys/func/addFunc',
    method: 'post',
    data
  })
}
export function updateFunc(data) {
  return request({
    url: '/sys/func/updateFunc',
    method: 'post',
    data
  })
}
export function deleteFunc(data) {
  return request({
    url: '/sys/func/deleteFunc',
    method: 'post',
    data
  })
}
