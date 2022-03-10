import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { routes } from './routes'

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach(item => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(routes)

console.log(routes)

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

// reset router instance to avoid memory leak
// Router.beforeEach((to, from, next) => {
//   if (to.path !== from.path) {
//     // scroll to top
//     window.scrollTo(0, 0)
//   }
//   next()
// })
export function resetRouter() {
  Router.getRoutes().forEach(route => {
    if (route.meta && route.meta.auth) {
      // route.meta.title = t(`routes.${route.name}.title`)
    }
    if (route.name && WHITE_NAME_LIST.includes(route.name as string)) {
      // route.meta.auth = false
      Router.hasRoute(route.name) && Router.removeRoute(route.name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(Router)
}
