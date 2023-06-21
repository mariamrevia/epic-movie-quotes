import axios from '@/plugins/axios/axios.js'

export async function getMovies() {
  return axios.get('/movies')
}
