// import { useStore } from 'vuex';
// import VueI18n from 'vue-i18n'

// import type { App } from 'vue'
import { createI18n, I18nOptions } from 'vue-i18n'
import en from '/@/locales/en.json'
import zh from '/@/locales/zh.json'
// import { setHtmlPageLang, setLoadLocalePool } from './helper'
import { localeSetting } from '/@/config/localeSetting'
// import { useLocaleStoreWithOut } from '~/store/modules/locale'

// export let i18n: ReturnType<typeof createI18n>

async function createI18nOptions(): Promise<I18nOptions> {
  //   const defaultLocal = await import(`./lang/${locale}.ts`)
  //   const message = defaultLocal.default?.message ?? {}

  return {
    legacy: false,
    // globalInjection: false,
    locale: localeSetting.locale,
    fallbackLocale: localeSetting.fallback,
    messages: {
      zh,
      en,
    },
    availableLocales: localeSetting.availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

// setup i18n instance with glob
// export async function setupI18n(app: App) {
//   const options = await createI18nOptions()
//   i18n = createI18n(options) as I18n
//   app.use(i18n)
// }
const options = await createI18nOptions()
export const i18n = createI18n(options)
