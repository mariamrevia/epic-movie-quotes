import { defineStore } from 'pinia'

export const useResetPasswordEmailStore = defineStore('resetPasswordEmail', {
  state: () => ({
    email: ''
  })

})
