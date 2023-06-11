import axios from '@/plugins/axios/axios.js'
export async function register(username, email, password, password_confirmation) {
    return axios.post('/register', {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    })
  }
  