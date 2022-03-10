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
    <Form.Item name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('auth.login.userName')"
        class="fix-auto-fill"
      />
    </Form.Item>
    <Form.Item name="password" class="enter-x">
      <Input.Password
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('auth.login.password')"
      />
    </Form.Item>

    <Row class="enter-x">
      <Col :span="12">
        <Form.Item>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('auth.login.rememberMe') }}
          </Checkbox>
        </Form.Item>
      </Col>
      <Col :span="12">
        <Form.Item :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button
            type="link"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            {{ t('auth.login.forgetPassword') }}
          </Button>
        </Form.Item>
      </Col>
    </Row>

    <Form.Item class="enter-x">
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
    </Form.Item>
    <Row class="enter-x">
      <Col :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('auth.login.mobileSignInFormTitle') }}
        </Button>
      </Col>
      <Col :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('auth.login.qrSignInFormTitle') }}
        </Button>
      </Col>
      <Col :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('auth.login.registerButton') }}
        </Button>
      </Col>
    </Row>

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
