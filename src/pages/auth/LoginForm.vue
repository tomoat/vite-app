<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('auth.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('auth.login.password')"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('auth.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button
            type="link"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            {{ t('auth.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button
        type="primary"
        size="large"
        block
        @click="handleLogin"
        :loading="loading"
      >
        {{ t('auth.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('auth.login.registerButton') }}
      </Button> -->
    </FormItem>
    <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('auth.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('auth.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('auth.login.registerButton') }}
        </Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">{{ t('auth.login.otherSignIn') }}</Divider>

    <div
      class="flex justify-evenly enter-x"
      :class="`${prefixCls}-sign-in-way`"
    ></div>
  </Form>
</template>
<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'

import {
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Button,
  Divider,
  notification,
  Modal,
} from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import LoginFormTitle from './LoginFormTitle.vue'
// import { useMessage } from '~/hooks/web/useMessage'
import { useUserStore } from '/@/store/userStore'
import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid,
} from '/@/composables/useLogin'
import { useDesign } from '/@/hooks/useDesign'
//import { onKeyStroke } from '@vueuse/core';

const ACol = Col
const ARow = Row
const FormItem = Form.Item
const InputPassword = Input.Password
const { t } = useI18n()
// const { notification, createErrorModal } = useMessage()
const { prefixCls } = useDesign('login')
const userStore = useUserStore()

const { setLoginState, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const formData = reactive({
  account: 'admin',
  password: 'admin',
})

const { validForm } = useFormValid(formRef)

//onKeyStroke('Enter', handleLogin);

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

async function handleLogin() {
  const data = await validForm()
  if (!data) return
  try {
    loading.value = true
    const userInfo = await userStore.login({
      password: data.password,
      username: data.account,
      mode: 'none', //不要默认的错误提示
    })
    if (userInfo) {
      notification.success({
        message: t('auth.login.loginSuccessTitle'),
        description: `${t('auth.login.loginSuccessDesc')}: ${
          userInfo.realName
        }`,
        duration: 3,
      })
    }
  } catch (error) {
    createErrorModal({
      title: t('auth.api.errorTip'),
      content:
        (error as unknown as Error).message ||
        t('auth.api.networkExceptionMsg'),
      getContainer: () =>
        document.body.querySelector(`.${prefixCls}`) || document.body,
    })
  } finally {
    loading.value = false
  }
}
</script>
