import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/user/info',
    method: 'get',
    params: { token }
  })
}
export function getUserFunc(token) {
  return request({
    url: '/sys/func/getUserFunc',
    method: 'get',
    params: { token }
  })
}
export function logout(token) {
  return request({
    url: '/sys/auth/logout',
    method: 'post'
  })
}
