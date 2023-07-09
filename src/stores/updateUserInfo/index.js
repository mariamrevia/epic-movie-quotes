import { defineStore } from 'pinia'
import actions from './actions'

export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    user: null,

    userData: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }),
  actions: actions
})
