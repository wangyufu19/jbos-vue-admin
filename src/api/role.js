import request from "@/utils/request";

export function getRoleList(params) {
  return request({
    url: '/sys/role/getRoleList',
    method: 'get',
    params
  })
}
export function addRole(data) {
  return request({
    url: '/sys/role/addRole',
    method: 'post',
    data
  })
}
export function updateRole(data) {
  return request({
    url: '/sys/role/updateRole',
    method: 'post',
    data
  })
}
export function deleteRole(data) {
  return request({
    url: '/sys/role/deleteRole',
    method: 'post',
    data
  })
}

