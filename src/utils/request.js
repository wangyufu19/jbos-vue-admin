import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
http.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Message({
      message: '服务器请求异常，请联系管理员!',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// response interceptor
http.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 0000, it is judged as an error.
    if (res.retCode !== '0000') {
      Message({
        message: res.retMsg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.retCode === 401 || res.retCode === 50012 || res.retCode === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.retMsg || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '服务器响应异常，请联系管理员!',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default http
