import request from "@/utils/request";

export function getRoleList(params) {
  return request({
    url: '/sys/role/getRoleList',
    method: 'get',
    params
  })
}
export function addRole(params) {
  return request({
    url: '/sys/role/addRole',
    method: 'post',
    params
  })
}
export function updateRole(params) {
  return request({
    url: '/sys/role/updateRole',
    method: 'post',
    params
  })
}
export function deleteRole(params) {
  return request({
    url: '/sys/role/deleteRole',
    method: 'post',
    params
  })
}

