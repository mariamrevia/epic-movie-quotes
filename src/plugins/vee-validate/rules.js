import { defineRule } from 'vee-validate'
import i18n from '@/i18n'

defineRule('required', (value) => {
  if (!value || !value.length) {
    return i18n.global.t('validation.required')
  }
  return true
})
defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true
  }
  return i18n.global.t('validation.confirm')
})
defineRule('email', (value) => {
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(value)) {
    return i18n.global.t('validation.email')
  }
  return true
})

defineRule('minLength', (value, [limit]) => {
  if (value.length < limit) {
    return i18n.global.t('validation.minLength', { limit })
  }
  return true
})
defineRule('maxLength', (value, [limit]) => {
  if (value.length > limit) {
    return i18n.global.t('validation.maxLength', { limit })
  }
  return true
})
defineRule('lowercase', (value) => {
  if (value !== value.toLowerCase()) {
    return i18n.global.t('validation.lowerCase')
  }
  return true
})
