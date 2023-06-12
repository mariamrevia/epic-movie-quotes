import { defineRule } from 'vee-validate'

defineRule('required', (value) => {
  if (!value || !value.length) {
    return 'Field is required'
  }
  return true
})
defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true
  }
  return 'Passwords must match'
})
defineRule('email', (value) => {
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(value)) {
    return 'This field must be a valid email'
  }
  return true
})

defineRule('minLength', (value, [limit]) => {
  if (value.length < limit) {
    return `This field must be at least ${limit} characters`
  }
  return true
})
defineRule('maxLength', (value, [limit]) => {
  if (value.length > limit) {
    return `This field must not exceed ${limit} characters`
  }
  return true
})
