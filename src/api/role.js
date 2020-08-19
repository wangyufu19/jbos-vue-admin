import request from "@/utils/request";

export function getRoleList(params) {
  return request({
    url: '/sys/role/getRoleList',
    method: 'get',
    params
  })
}
export function getRoleFuncs(params) {
  return request({
    url: '/sys/role/getRoleFuncs',
    method: 'get',
    params
  })
}
export function saveRoleFuncs(data) {
  return request({
    url: '/sys/role/saveRoleFuncs',
    method: 'post',
    data
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

