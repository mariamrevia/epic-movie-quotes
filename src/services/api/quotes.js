import axios from '@/plugins/axios/axios.js'

export async function storeQuotes(data) {
  console.log(data.image)
  return await axios.post('/quotes', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export async function updateQuotes(data) {
  return await axios.post(`/quotes${data.id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-HTTP-Method-Override': 'PATCH'
    }
  })
}

export async function getQuotes() {
  return axios.get('/quotes')
}

export async function storeComments(body, quote_id) {
  return await axios.post('/comments', body, quote_id)
}
