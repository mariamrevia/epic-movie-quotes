import axios from '@/plugins/axios/axios.js'
export async function register(username, email, password, password_confirmation) {
    return axios.post('/register', {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    })
  }
  
  export async function login(username , password) {
    return axios.post('/login', {
      username:username,
      password:password
  
    })
  }
  export async function getUser() {
    return axios.get('/user')
  }

  export async function resetPasswordVerifyEmail(email) {
    return axios.post('/forgot-password', email)
  }
  export async function resetPassword({ email, password, password_confirmation, token }) {
    return axios.post('/reset-password', { password, password_confirmation, email, token })
  }
  