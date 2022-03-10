import { http } from '/@/utils/http'
import { loginResult, UserInfo } from './userInterface'

interface captchaType extends Promise<any> {
  svg?: string
  code?: number
  info?: object
}

// 获取验证码
export const getVerify = (): captchaType => {
  return http.request('get', '/captcha')
}

// 登录
export const getLogin = (data: object) => {
  return http.request<loginResult>('post', '/login', { data })
}

// 刷新token
export const refreshToken = (data: object) => {
  return http.request<loginResult>('post', '/refreshToken', { data })
}

// export const searchVague = (data: object) => {
//   return http.request("post", "/searchVague", { data });
// };

export const getAsyncRoutes = (params?: object) => {
  return http.request('get', '/getAsyncRoutes', { params })
}

export const getSmsCaptcha = (data: object) => {
  return http.request('post', '/smsCaptcha', { data })
}

export function getUserInfo() {
  return http.request<UserInfo>('get', '/userInfo')
}
