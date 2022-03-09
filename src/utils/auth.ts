import { Persistent, BasicKeys } from '/@/utils/cache/persistent'
import {
  ProjectConfig,
  CacheTypeEnum,
  TOKEN_KEY,
} from '/@/config/projectSetting'

const { permissionCacheType } = ProjectConfig
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL

export function getToken() {
  return getAuthCache(TOKEN_KEY)
}

export function setToken(token: string) {
  setAuthCache(TOKEN_KEY, token)
}

export function removeToken() {
  clearAuthCache()
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key) as T
}

export function setAuthCache(key: BasicKeys, value: any) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  return fn(key, value, true)
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession
  return fn(immediate)
}
