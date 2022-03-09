<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    v-bind="layoutConf"
    :locale="locale"
    :loading="loading"
    :menu-data="menuData"
    :breadcrumb="{ routes: breadcrumb }"
  >
    <!-- :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    :breadcrumb="breadcrumb"
    v-bind="settings" -->

    <!-- Ads begin
      广告代码 真实项目中请移除
      production remove this Ads
    -->
    <!-- <ads v-if="isProPreviewSite && !collapsed"/> -->
    <!-- Ads end -->

    <!-- 1.0.0+ 版本 pro-layout 提供 API，
          我们推荐使用这种方式进行 LOGO 和 title 自定义
    -->
    <!-- <pro-layout-logo>
      <img src="~@/assets/logo.svg" alt="logo" />
      <span>Ant Design</span>
    </pro-layout-logo> -->
    <template #menuHeaderRender>
      <router-link :to="{ path: '/' }">
        <!-- <img src="~@/assets/logo.svg" alt="logo" /> -->
        <logo-svg />
        <h1>{{ layoutConf.title }}</h1>
      </router-link>
    </template>
    <!-- 1.0.0+ 版本 pro-layout 提供 API,
          增加 Header 左侧内容区自定义
    -->
    <template v-slot:headerContentRender>
      <div>
        <a-tooltip title="刷新页面">
          <a-icon
            type="reload"
            style="font-size: 18px; cursor: pointer"
            @click="
              () => {
                console.log('refresh')
                // $message.info('只是一个DEMO')
              }
            "
          />
        </a-tooltip>
      </div>
    </template>
    <template #rightContentRender>
      <right-content :current-user="currentUser" />
    </template>
    <!-- custom breadcrumb itemRender  -->
    <template #breadcrumbRender="{ route, params, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        <HeartOutlined />
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="{ path: route.path, params }">
        <SmileOutlined />
        {{ route.breadcrumbName }}
      </router-link>
    </template>
    <setting-drawer v-model="layoutConf" />
    <router-view v-slot="{ Component, route }">
      <transition name="zoom" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <!-- custom footer / 自定义Footer -->
    <template #footerRender>
      <global-footer
        :links="[{ title: 'Slashare', href: 'https://www.slashare.com' }]"
        copyright="2022 &copy; teaproofreading"
      />
    </template>
    <!-- <router-view /> -->
  </pro-layout>
</template>

<script setup lang="ts">
// import { getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout'
// import { i18nRender } from '@/locales'
// import { mapState } from 'vuex'
// import {
//   CONTENT_WIDTH_TYPE,
//   SIDEBAR_TYPE,
//   TOGGLE_MOBILE_TYPE,
// } from '@/store/mutation-types'

// import defaultSettings from '@/config/defaultSettings'
// import RightContent from '@/components/GlobalHeader/RightContent'
// import GlobalFooter from '@/components/GlobalFooter'
// import Ads from '@/components/Other/CarbonAds'
// import LogoSvg from '../assets/logo.svg?inline'

import { computed, reactive, ref, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import {
  SmileOutlined,
  HeartOutlined,
  // SettingOutlined,
} from '@ant-design/icons-vue'
import {
  getMenuData,
  clearMenuItem,
  RouteContextProps,
  GlobalFooter,
} from '@ant-design-vue/pro-layout'
import RightContent from '/@/components/RightContent/RightContent.vue'
import defaultSettings from '/@/config/defaultSettings'

const loading = ref(false)
const locale = (i18n: string) => i18n
const router = useRouter()

const { menuData } = getMenuData(clearMenuItem(router.getRoutes()))

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default value
  openKeys: ['/dashboard'],
  selectedKeys: ['/welcome'],
})
const layoutConf = ref({
  navTheme: defaultSettings.navTheme, // dark, light
  layout: 'mix', // 'side', 'topmenu'
  splitMenus: false,
  menuData,
  title: defaultSettings.title || 'ProLayout',
  // logo: 'https://www.baidu.com/img/baidu_jgylogo3.svg',
  fixedHeader: false,
  fixSiderbar: false,
})

const breadcrumb = computed(() =>
  router.currentRoute.value.matched.concat().map(item => {
    return {
      path: item.path,
      breadcrumbName: item.meta.title || '',
    }
  }),
)

const currentUser = reactive({
  nickname: 'Admin',
  avatar: 'A',
})

watch(
  router.currentRoute,
  () => {
    const matched = router.currentRoute.value.matched.concat()
    state.selectedKeys = matched
      .filter(r => r.name !== 'index')
      .map(r => r.path)
    state.openKeys = matched
      .filter(r => r.path !== router.currentRoute.value.path)
      .map(r => r.path)
  },
  {
    immediate: true,
  },
)

// export default {
//   name: 'BasicLayout',
//   components: {
//     RightContent,
//     GlobalFooter,
//     // LogoSvg,
//     // Ads,
//   },
//   data() {
//     return {
//
//       // base
//       menus: [],
//       // 侧栏收起状态
//       collapsed: false,
//       title: defaultSettings.title,
//       settings: {
//         // 布局类型
//         layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
//         // CONTENT_WIDTH_TYPE
//         contentWidth:
//           defaultSettings.layout === 'sidemenu'
//             ? CONTENT_WIDTH_TYPE.Fluid
//             : defaultSettings.contentWidth,
//         // 主题 'dark' | 'light'
//         theme: defaultSettings.navTheme,
//         // 主色调
//         primaryColor: defaultSettings.primaryColor,
//         fixedHeader: defaultSettings.fixedHeader,
//         fixSiderbar: defaultSettings.fixSiderbar,
//         colorWeak: defaultSettings.colorWeak,

//         hideHintAlert: false,
//         hideCopyButton: false,
//       },
//       // 媒体查询
//       query: {},

//       // 是否手机模式
//       isMobile: false,
//     }
//   },
//   computed: {
//     ...mapState({
//       // 动态主路由
//       mainMenu: state => state.permission.addRouters,
//     }),
//   },
//   created() {
//     const routes = this.mainMenu.find(item => item.path === '/')
//     this.menus = (routes && routes.children) || []
//     // 处理侧栏收起状态
//     this.$watch('collapsed', () => {
//       this.$store.commit(SIDEBAR_TYPE, this.collapsed)
//     })
//     this.$watch('isMobile', () => {
//       this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
//     })
//   },
//   mounted() {
//     const userAgent = navigator.userAgent
//     if (userAgent.indexOf('Edge') > -1) {
//       this.$nextTick(() => {
//         this.collapsed = !this.collapsed
//         setTimeout(() => {
//           this.collapsed = !this.collapsed
//         }, 16)
//       })
//     }

//     // first update color
//     // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
//     if (
//       process.env.NODE_ENV !== 'production' ||
//       process.env.VUE_APP_PREVIEW === 'true'
//     ) {
//       updateTheme(this.settings.primaryColor)
//     }
//   },
//   methods: {
//     i18nRender,
//     handleMediaQuery(val) {
//       this.query = val
//       if (this.isMobile && !val['screen-xs']) {
//         this.isMobile = false
//         return
//       }
//       if (!this.isMobile && val['screen-xs']) {
//         this.isMobile = true
//         this.collapsed = false
//         this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
//         // this.settings.fixSiderbar = false
//       }
//     },
//     handleCollapse(val) {
//       this.collapsed = val
//     },
//     handleSettingChange({ type, value }) {
//       console.log('type', type, value)
//       type && (this.settings[type] = value)
//       switch (type) {
//         case 'contentWidth':
//           this.settings[type] = value
//           break
//         case 'layout':
//           if (value === 'sidemenu') {
//             this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
//           } else {
//             this.settings.fixSiderbar = false
//             this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
//           }
//           break
//       }
//     },
//   },
// }
</script>

<style lang="less">
@import './basic-layout.less';
</style>
