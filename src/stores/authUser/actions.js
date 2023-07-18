import { getUser } from '@/services/api/auth.js'
export default {
  async fetchUser() {
    try {
      const user = await getUser()
      this.username = user.data.username
      this.user = user.data.id
      this.email = user.data.email
      this.google_id = user.data.google_id
      this.image = user.data.image
      this.isAuthenticated = !!user
      if (user.data.email_verified_at === null) {
        this.verified === user.data.google_id
      } else {
        this.verified === user.data.email_verified_at
      }
    } catch (error) {
      console.error(error)
    }
  }
}
