import axios from '@/plugins/axios/axios.js'

export async function getMovies() {
  return axios.get('/movies')
}

export async function storeMovies({ name, director, year, description, genre, image }) {
  const formData = new FormData()
  formData.set('name[en]', name.en)
  formData.set('name[ka]', name.ka)
  formData.set('director[en]', director.en)
  formData.set('director[ka]', director.ka)
  formData.set('description[en]', description.ka)
  formData.set('description[ka]', description.ka)
  formData.append('image', image)
  formData.set('genre', genre)
  formData.set('year', year)
  return await axios.post('/movies', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
