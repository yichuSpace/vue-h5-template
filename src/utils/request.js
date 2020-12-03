import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import { baseUrl } from '@/config' // 根据环境不同引入不同api地址
import { getUrlKey } from '@/utils/index'

export const apiGetway = {
  oa: 'oa', // oa业务接口
  workflow: 'workflow', // 流程api
  portal: 'portal', // 平台api
  console: 'console' // 平台api
}
// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base api url + request url
  withCredentials: true, // 是否是跨域请求
  timeout: 5000 // 响应时间
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (sessionStorage.getItem('token')) {
      config.headers['token'] = sessionStorage.getItem('token')
    }
    // 在详情表单页，只要localstorage里有存身份id，所有请求header加上identityId，后端用来处理多身份待办；
    const taskPosiIdHeader = JSON.parse(localStorage.getItem('taskPosiId'))
    const identityId = JSON.parse(localStorage.getItem('identityId'))
    if ((getUrlKey('type') === 'todo') && taskPosiIdHeader && getUrlKey('id') && taskPosiIdHeader.hasOwnProperty(getUrlKey('id')) && config.url.indexOf('workflow/workflowController/newFlowNodeInfo') === -1) {
      config.headers['identityId'] = taskPosiIdHeader[getUrlKey('id')]
    }
    // 多身份处理待阅、授权等阅时，在header里面加identityId，后端用来处理多身份待办；
    if (getUrlKey('type') === 'toread' && identityId && identityId[getUrlKey('id')] && config.url.indexOf('portal/circulationController/save') !== -1) {
      config.headers['identityId'] = identityId[getUrlKey('id')]
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      if (res.status === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

/**
 * 返回一个Promise(发送post请求)
 * params: 参数
 * 第三个参数: 表示以get方式请求；不传表示默认为post方式请求
 */
export function fetch(getway, action, get, params, bmType) {
  if (getway) {
    action = `${apiGetway[getway]}${action}`
  }

  return new Promise((resolve, reject) => {
    if (get === 'get') {
      service.get(action).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
        .catch(error => {
          reject(error)
        })
    } else {
      const headers = {}
      if (bmType === 'formdata') {
        headers['content-type'] = 'multipart/form-data'
      } else if (bmType === 'excel') {
        headers['content-type'] = 'application/vnd.ms-excel;charset=UTF-8'
      } else if (bmType === 'form') {
        headers['content-type'] = 'application/x-www-form-urlencoded'
      } else {
        headers['content-type'] = 'application/json;charset=UTF-8'
      }
      service.post(action, params, {
        headers
      }).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
        .catch(error => {
          reject(error)
        })
    }
  })
}
