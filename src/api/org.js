import request from '@/utils/request'

export function getOgrTree(params) {
  return request({
    url: '/sys/org/getOgrTree',
    method: 'get',
    params
  })
}
