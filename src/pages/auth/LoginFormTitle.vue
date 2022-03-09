<template>
  <h2
    class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left"
  >
    {{ getFormTitle }}
  </h2>
</template>
<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { LoginStateEnum, useLoginState } from '/@/composables/useLogin'

const { t } = useI18n()

const { getLoginState } = useLoginState()

const getFormTitle = computed(() => {
  const titleObj = {
    [LoginStateEnum.RESET_PASSWORD]: t('auth.login.forgetFormTitle'),
    [LoginStateEnum.LOGIN]: t('auth.login.signInFormTitle'),
    [LoginStateEnum.REGISTER]: t('auth.login.signUpFormTitle'),
    [LoginStateEnum.MOBILE]: t('auth.login.mobileSignInFormTitle'),
    [LoginStateEnum.QR_CODE]: t('auth.login.qrSignInFormTitle'),
  }
  return titleObj[unref(getLoginState)]
})
</script>
