<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo class="-enter-x" />
          <div class="my-auto">
            <img
              :alt="title"
              src="../../../assets/svg/login-box-bg.svg"
              class="w-1/2 -mt-16 -enter-x"
            />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl">
                {{ t('routes.login.signInTitle') }}
              </span>
            </div>
            <div
              class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x"
            >
              <!-- {{ t('routes.login.signInDesc') }} -->
            </div>
          </div>
        </div>
        <div
          class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12"
        >
          <div
            :class="`${prefixCls}-form`"
            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <LoginForm />
            <!-- <ForgetPasswordForm /> -->
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import defaultSetting from '/@/config/defaultSettings'
// import { AppLogo } from '~/components/Application'
// import { AppLocalePicker, AppDarkModeToggle } from '~/components/Application'
import LoginForm from './LoginForm.vue'
// import ForgetPasswordForm from './ForgetPasswordForm.vue'
import RegisterForm from './RegisterForm.vue'
import { useDesign } from '/@/hooks/useDesign'
// import { useLocaleStore } from '~/store/modules/locale'

defineProps({
  sessionTimeout: {
    type: Boolean,
  },
})

// const globSetting = useGlobSetting()
const { prefixCls } = useDesign('login')
const { t } = useI18n()
// const localeStore = useLocaleStore()
// const showLocale = localeStore.getShowPicker
const title = computed(() => defaultSetting?.title ?? '')
</script>
<style lang="less">
@import './Login.less';
</style>
