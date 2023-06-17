import axios from 'axios'

let defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api'
})
defaultInstance.defaults.withCredentials = true
export default defaultInstance
