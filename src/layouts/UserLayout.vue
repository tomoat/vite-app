<script lang="ts">
// import { deviceMixin } from '@/store/device-mixin'
// import SelectLang from '@/components/SelectLang'

export default {
  name: 'UserLayout',
  components: {
    // SelectLang,
  },
  // mixins: [deviceMixin],
  mounted() {
    document.body.classList.add('userLayout')
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  },
}
</script>

<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="container">
      <div class="user-layout-lang">
        <select-lang class="select-lang-trigger" />
      </div>
      <div class="user-layout-content">
        <div class="top">
          <div class="header">
            <a href="/">
              <img src="/@/assets/logo.svg" class="logo" alt="logo" />
              <span class="title">Ant Design</span>
            </a>
          </div>
          <div class="desc">
            userLayout.title
            <!-- {{ t('layouts.userLayout.title') }} -->
          </div>
        </div>

        <router-view />

        <div class="footer">
          <div class="links">
            <a href="_self">帮助</a>
            <a href="_self">隐私</a>
            <a href="_self">条款</a>
          </div>
          <div class="copyright">Copyright &copy; 2018 vueComponent</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// import { themeColor } from '@/styles/theme'
@import './user-layout.less';
</style>
