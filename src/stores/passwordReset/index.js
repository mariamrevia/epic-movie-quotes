import { defineStore } from 'pinia'

export const usePasswordResetStore = defineStore('passwordReset', {
  state: () => ({
    password: '',
    password_confirmation:''
  }),

  
})
