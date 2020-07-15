import request from "@/utils/request";

export function getDepList(params) {
  return request({
    url: '/sys/dep/getDepList',
    method: 'get',
    params
  })
}
export function addDep(params) {
  return request({
    url: '/sys/dep/addDep',
    method: 'post',
    params
  })
}

export function updateDep(params) {
  return request({
    url: '/sys/dep/updateDep',
    method: 'post',
    params
  })
}

export function deleteDep(params) {
  return request({
    url: '/sys/dep/deleteDep',
    method: 'post',
    params
  })
}
