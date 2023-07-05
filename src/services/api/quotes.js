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

export async function getQuotes(page) {
  return axios.get('/quotes', {
    params: { page: page }
  })
}
export async function getSearchResults(query) {
  return axios.get('/quotes/search', { params: { search: query } })
}
export async function storeComments(body, quote_id) {
  return await axios.post('/comments', body, quote_id)
}
export async function storeLikes(quote_id, is_liked) {
  return await axios.post('/likes', quote_id, is_liked)
}
export async function deleteQuote(quote_id) {
  return await axios.delete(`/quotes/${quote_id}`)
}
