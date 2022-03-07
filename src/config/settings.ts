/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */
const defaultSetting = {
  title: '后台管理系统',
  /**
   * @type {boolean} true | false
   * @description whether fix the header
   */
  fixedHeader: false,
  /**
   * @type {boolean} true | false
   * @description whether fixed sidebar
   */
  fixedSidebar: false,
  /**
   * @type {boolean} true | false
   * @description whether show the logo in sidebar
   */
  sideBarLogo: true,
  /**
   * @type {boolean} true | false
   * @description whether show the rightPanel // 设置中心
   */
  showSettings: true,

  pwa: false,
  production:
    process.env.NODE_ENV === 'production' &&
    process.env.VUE_APP_MODE === 'production' &&
    process.env.VUE_APP_PREVIEW !== 'true',
  /**
   * @type {boolean} true | false
   * @description whether show locale selector
   */
  menu: {
    locale: true,
  },
  /**
   * @type {boolean} true | false
   * @description Whether show color weak.
   */
  colorWeak: false,
  /**
   * @type {string} 'dark' | 'light'
   * @description show theme switch for nav menu
   */
  navTheme: 'dark',
  primaryColor: '#1890FF',
  /**
   * @type {string} 'sidemenu' | 'topmenu'
   * @description set nav menu position: sidemenu or topmenu
   */
  layout: 'sidemenu',
  /**
   * @type {string} 'Fluid' | 'Fixed'
   * @description layout of content (Fluid or Fixed), only works when layout is topmenu
   */
  contentWidth: 'Fluid',
}

export default defaultSetting
