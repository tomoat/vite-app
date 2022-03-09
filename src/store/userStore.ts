import { defineStore } from 'pinia'
import { store } from './'
import {
  RoleEnum,
  PageEnum,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '/@/config/projectSetting'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { GetUserInfoModel, LoginParams } from '/@/api/user'
import { doLogout, getUserInfo, loginApi } from '~/api/sys/user'
import { useI18n } from 'vue-i18n'
import { useMessage } from '~/hooks/web/useMessage'
import { router } from '/@/router'
import { usePermissionStore } from '/@/store/permissionStore'
import { RouteRecordRaw } from 'vue-router'
import { PAGE_NOT_FOUND_ROUTE } from '~/router/routes/basic'
import { isArray } from '/@/utils/is'
import { h } from 'vue'

interface UserState {
  userInfo: object
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}

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
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const data = await loginApi(loginParams, mode)
        const { token } = data

        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
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
            router.addRoute(route as unknown as RouteRecordRaw)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
          permissionStore.setDynamicAddedRoute(true)
        }
        goHome &&
          (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
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
          await doLogout()
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && router.push(PageEnum.BASE_LOGIN)
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      const { t } = useI18n()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true)
        },
      })
    },

    // 刷新token
    async refreshToken(params) {
      return refreshToken(params).then(params => {
        if (params) {
          setToken(params)
          return data
        }
      })
    },
  },
})

// Need to be used outside the setup
export function useUserStoreHook() {
  return useUserStore(store)
}
