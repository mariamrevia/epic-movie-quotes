import axios from '@/plugins/axios/axios.js'

export async function storeQuotes(data) {
  console.log(data.image)
  return await axios.post('/quotes', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
