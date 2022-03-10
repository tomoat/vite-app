/**
 * @description: Login interface parameters
 */
export interface loginParams {
  username: string
  password: string
}

export interface roleInfo {
  roleName: string
  value: string
}

/**
 * @description: Login interface return value
 */
export interface loginResult {
  userId: string | number
  token: string
  role: roleInfo
}

/**
 * @description: Get user information return value
 */
export interface UserInfo {
  roles: roleInfo[]
  // 用户id
  userId: string | number
  // 用户名
  username: string
  // 真实名字
  realName: string
  // 头像
  avatar: string
  // 介绍
  desc?: string
  homePath?: string
}
