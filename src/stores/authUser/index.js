import { defineStore } from 'pinia'
import actions from '@/stores/authUser/actions'
export const useUserStore = defineStore('authUser', {
  state: () => ({
    user: null,
    verified: null,
    username: null,
    email: null,
    google_id: null,
    isAuthenticated: false
  }),
  actions: actions
})
