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
export async function storeLikes(quote_id) {
  return await axios.post(`/likes`, { quote_id: quote_id })
}
export async function likeNotification(movie_id) {
  return await axios.post(`/notifications/${movie_id}/like`)
}
export async function commentNotification(movie_id) {
  return await axios.post(`/notifications/${movie_id}/comment`)
}
export async function destroyLikes(quote_id) {
  return await axios.delete(`/likes/${quote_id.quote_id}`)
}
export async function deleteQuote(quote_id) {
  return await axios.delete(`/quotes/${quote_id}`)
}
export async function getNotifications(user) {
  console.log(user)
  return await axios.get(`/notifications/${user}`)
}

export async function markAsRead(user) {
  return await axios.patch(`notifications/markread/${user}`, {
    headers: {
      'X-HTTP-Method-Override': 'PATCH'
    }
  })
}
