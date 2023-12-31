import axios from '@/plugins/axios/axios.js'

export async function getMovies() {
  return axios.get('/movies')
}

export async function storeMovies(data) {
  return await axios.post('/movies', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export async function updateMovies(data) {
  return await axios.post(`/movies/${data.movie}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-HTTP-Method-Override': 'PATCH'
    }
  })
}

export async function getSearchResults(query) {
  return axios.get('/movies/search', { params: { search: query } })
}

export async function deleteMovie(movie_id) {
  return await axios.delete(`/movies/${movie_id}`)
}
