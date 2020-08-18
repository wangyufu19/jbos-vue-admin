import request from "@/utils/request";

export function getEmpList(params) {
  return request({
    url: '/sys/emp/getEmpList',
    method: 'get',
    params
  })
}
export function addEmp(data) {
  return request({
    url: '/sys/emp/addEmp',
    method: 'post',
    data
  })
}
export function updateEmp(data) {
  return request({
    url: '/sys/emp/updateEmp',
    method: 'post',
    data
  })
}
export function deleteEmp(data) {
  return request({
    url: '/sys/emp/deleteEmp',
    method: 'post',
    data
  })
}
