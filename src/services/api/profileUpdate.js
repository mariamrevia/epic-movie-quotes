import axios from '@/plugins/axios/axios.js'

export async function updateUsersInfo({ user, username, email, password, password_confirmation }) {
  return axios.post(
    `/user/${user}`,
    {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    },
    {
      headers: {
        'X-HTTP-Method-Override': 'PATCH'
      }
    }
  )
}
