import { defineStore } from 'pinia'


export const useRegisterStore = defineStore('register', {
  state: () => ({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    
  }),
})