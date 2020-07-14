import request from "@/utils/request";


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
export function addFunc(params) {
  return request({
    url: '/sys/func/addFunc',
    method: 'post',
    params
  })
}
export function updateFunc(params) {
  return request({
    url: '/sys/func/updateFunc',
    method: 'post',
    params
  })
}
export function deleteFunc(params) {
  return request({
    url: '/sys/func/deleteFunc',
    method: 'post',
    params
  })
}
