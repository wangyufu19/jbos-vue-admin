import request from '@/utils/request'

export function captcha(data) {
  return request({
    url: '/captcha',
    method: 'post',
    data
  })
}
