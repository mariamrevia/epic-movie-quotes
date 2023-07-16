import axios from '@/plugins/axios/axios.js'

export async function updateUsersInfo({
  user,
  username,
  email,
  password,
  password_confirmation,
  image
}) {
  return axios.post(
    `/user/${user}`,
    {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      image: image
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PATCH'
      }
    }
  )
}
