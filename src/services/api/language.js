import axios from '@/plugins/axios/axios.js'

export async function sendLocale(locale) {
  return axios.post(`/languages/${locale}`)
}
