// import { RouteRecord } from 'vue-router'
import { i18n } from '/@/composables/useI18n'

const { t } = i18n.global
// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()

// const PAGE_NOT_FOUND_ROUTE = {
//   path: '/:path(.*)*',
//   name: 'PageNotFound',
//   component: import('/@/layouts/default/Index.vue'),
//   meta: {
//     title: 'ErrorPage',
//     hideBreadcrumb: true,
//     hideMenu: true,
//   },
//   children: [
//     {
//       path: '/:path(.*)*',
//       name: 'PageNotFound',
//       component: import('/@/pages/common/Exception.vue'),
//       meta: {
//         title: 'ErrorPage',
//         hideBreadcrumb: true,
//         hideMenu: true,
//       },
//     },
//   ],
// }

// const ERROR_LOG_ROUTE = {
//   path: '/error-log',
//   name: 'ErrorLog',
//   component: import('/@/layouts/default/Index.vue'),
//   redirect: '/error-log/list',
//   meta: {
//     title: 'ErrorLog',
//     hideBreadcrumb: true,
//     hideChildrenInMenu: true,
//   },
//   children: [
//     {
//       path: 'list',
//       name: 'ErrorLogList',
//       component: () => import('/@/pages/common/ErrorLog.vue'),
//       meta: {
//         title: t('routes.errorLogList'),
//         hideBreadcrumb: true,
//         currentActiveMenu: '/error-log',
//       },
//     },
//   ],
// }

// const REDIRECT_ROUTE = {
//   path: '/redirect',
//   component: import('/@/layouts/default/Index.vue'),
//   name: 'RedirectTo',
//   meta: {
//     title: 'Redirect',
//     hideBreadcrumb: true,
//     hideMenu: true,
//   },
//   children: [
//     {
//       path: '/redirect/:path(.*)',
//       name: 'Redirect',
//       component: () => import('/@/pages/common/Redirect.vue'),
//       meta: {
//         title: 'Redirect',
//         hideBreadcrumb: true,
//       },
//     },
//   ],
// }

// const asyncRoutes = import.meta.globEager('./**/*.ts')
const asyncRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/layouts/BasicLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('/@/pages/Dashboard.vue'),
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true,
        },
      },
    ],
  },
]

// const routeList: RouteRecord[] = []
// Object.keys(asyncRoutes).forEach(key => {
//   const route = asyncRoutes[key].default || {}
//   Array.isArray(route) ? routeList.push(...route) : routeList.push(route)
// })

export const constantRoutes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('/@/pages/Welcome.vue'),
  //   meta: { title: t('routes.index'), auth: false },
  // },
  // {
  //   path: '/',
  //   components: {
  //     default: Home,
  //     // short for LeftSidebar: LeftSidebar
  //     LeftSidebar,
  //     // they match the `name` attribute on `<router-view>`
  //     RightSidebar,
  //   },
  // },
  {
    path: '/user',
    component: () => import('/@/layouts/UserLayout.vue'),
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('/@/pages/auth/Login.vue'),
        meta: { title: t('routes.login'), auth: false },
      },
      // {
      //   path: 'register',
      //   name: 'Register',
      //   component: () => import('/@/pages/auth/Register.vue'),
      //   meta: { title: t('routes.register'), auth: false },
      // },
      // {
      //   path: 'register-result',
      //   name: 'registerResult',
      //   component: () => import('/@/pages/user/RegisterResult.vue'),
      //   meta: { title: t('routes.registerResult'), auth: false },
      // },
    ],
  },
  {
    path: '/:path(.*)*',
    component: () => import('/@/pages/common/Exception.vue'),
    hidden: true,
  },

  // {
  //   path: '/',
  //   component: () => import('/@/layouts/BasicLayout.vue'),
  //   children: [
  //     {
  //       path: '/',
  //       redirect: '/dashboard',
  //     },
  //     {
  //       path: '/dashboard',
  //       name: 'Dashboard',
  //       component: () => import('/@/pages/Dashboard.vue'),
  //       meta: {
  //         title: 'dashboard',
  //         icon: 'dashboard',
  //         affix: true,
  //       },
  //     },
  //     {
  //       path: '/profile',
  //       name: 'Profile',
  //       component: () => import('/@/pages/Profile.vue'),
  //       meta: {
  //         title: 'profile',
  //         icon: 'profile',
  //       },
  //     },
  //     {
  //       path: '/account',
  //       name: 'Account',
  //       component: () => import('/@/pages/Account.vue'),
  //       meta: {
  //         title: 'account',
  //         icon: 'account',
  //       },
  //     },
  //     {
  //       path: '/account/:id',
  //       name: 'AccountDetail',
  //       component: () => import('/@/pages/AccountDetail.vue'),
  //       meta: {
  //         title: 'accountDetail',
  //         icon: 'accountDetail',
  //       },
  //     },
  //     {
  //       path: '/account/:id/:type',
  //       name: 'AccountDetail',
  //       component: () => import('/@/pages/AccountDetail.vue'),
  //       meta: {
  //         title: 'accountDetail',
  //         icon: 'accountDetail',
  //       },
  //     },
  //   ],
  // },
]

export const routes = [
  // PAGE_NOT_FOUND_ROUTE,
  // ERROR_LOG_ROUTE,
  // REDIRECT_ROUTE,
  ...constantRoutes,
  ...asyncRoutes,
  // ...routeList,
]
