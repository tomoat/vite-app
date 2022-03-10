import { defineStore } from 'pinia'
import { store } from './'
import {
  RoleEnum,
  PageEnum,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '/@/config/projectSetting'
import { getAuthCache, setAuthCache, setToken } from '/@/utils/auth'
import { UserInfo, loginParams, loginResult } from '/@/api/userInterface'
import { getUserInfo, getLogin, refreshToken } from '/@/api/user'
import { useI18n } from 'vue-i18n'
import { Router } from '/@/router'
import { usePermissionStore } from '/@/store/permissionStore'
import { RouteRecordRaw } from 'vue-router'
import { isArray } from '/@/utils/is'
import { h } from 'vue'

interface UserState {
  userInfo: object
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}
type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: {},
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    // getUserInfo() {
    //   return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    // },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0
        ? this.roleList
        : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : '' // for null or undefined value
      setAuthCache(TOKEN_KEY, info)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setUserInfo(info: { [key: string]: any }) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = {}
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
    },
    /**
     * @description: login
     */

    async login(
      params: loginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<UserInfo | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const data: loginResult = await getLogin(loginParams)
        const { token } = data

        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<UserInfo | null> {
      if (!this.getToken) return null
      // get user info
      const userInfo = await this.getUserInfoAction()

      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStore()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach(route => {
            Router.addRoute(route as unknown as RouteRecordRaw)
          })
          permissionStore.setDynamicAddedRoute(true)
        }
        goHome &&
          (await Router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
      }
      return userInfo
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map(item => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          // await doLogout()
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo({})
      goLogin && Router.push(PageEnum.BASE_LOGIN)
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      // const { createConfirm } = useMessage()
      // const { t } = useI18n()
      // createConfirm({
      //   iconType: 'warning',
      //   title: () => h('span', t('sys.app.logoutTip')),
      //   content: () => h('span', t('sys.app.logoutMessage')),
      //   onOk: async () => {
      //     await this.logout(true)
      //   },
      // })
    },

    // 刷新token
    async refreshToken(params: any) {
      return refreshToken(params).then(params => {
        if (params) {
          setToken(params)
          // return data
        }
      })
    },
  },
})

// Need to be used outside the setup
export function useUserStoreHook() {
  return useUserStore(store)
}
