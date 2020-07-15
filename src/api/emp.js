import request from "@/utils/request";

export function getEmpList(params) {
  return request({
    url: '/sys/emp/getEmpList',
    method: 'get',
    params
  })
}
export function addEmp(params) {
  return request({
    url: '/sys/emp/addEmp',
    method: 'post',
    params
  })
}
export function updateEmp(params) {
  return request({
    url: '/sys/emp/updateEmp',
    method: 'post',
    params
  })
}
export function deleteEmp(params) {
  return request({
    url: '/sys/emp/deleteEmp',
    method: 'post',
    params
  })
}
