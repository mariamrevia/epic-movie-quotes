import { defineStore } from 'pinia'
import actions from './actions'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    notificationCount: 0
  }),
  actions: actions
})
