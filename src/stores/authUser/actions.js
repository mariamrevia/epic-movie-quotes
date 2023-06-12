import * as Api from '@/services/api/auth.js'
export default {
    async fetchUser() {
    try {
      const user = await Api.getUser();
      this.isAuthenticated = !!user;
      this.verified = user.data.email_verified_at;
      console.log(this.isAuthenticated)
    } catch (error) {
      console.error(error);
    }
  },
}