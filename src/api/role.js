import request from "@/utils/request";

export function getRoleChildrenNode(params) {
  return request({
    url: '/sys/role/getRoleChildrenNode',
    method: 'get',
    params
  })
}
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

export function getRoleEmpList(params) {
  return request({
    url: '/sys/role/getRoleEmpList',
    method: 'get',
    params
  })
}

export function getSelectRoleEmpList(params) {
  return request({
    url: '/sys/role/getSelectRoleEmpList',
    method: 'get',
    params
  })
}
export function addRoleUser(data) {
  return request({
    url: '/sys/role/addRoleUser',
    method: 'post',
    data
  })
}

