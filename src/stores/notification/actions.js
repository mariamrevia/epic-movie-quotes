import { getNotifications } from '@/services/api/quotes'
export default {
  setNotification(notifications) {
    this.notifications = notifications
  },

  async fetchNotifications(user) {
    try {
      const response = await getNotifications(user)
      this.notifications = response.data.data
    } catch (error) {
      console.error(error)
    }
  }
}
