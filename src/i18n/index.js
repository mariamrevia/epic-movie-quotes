import { createI18n } from 'vue-i18n'
import en from './lang/en/index.js'
import ka from './lang/ka/index.js'

const messages = {
  en,
  ka
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'ka',
  globalInjection: true,
  messages
})

export default i18n
