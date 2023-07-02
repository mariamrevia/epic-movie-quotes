import { defineStore } from 'pinia'

export const useQuoteStore = defineStore('quotes', {
  state: () => ({
    quotes: [],
    comments: [],
    quoteData: {
      body: {
        en: '',
        ka: ''
      },
      movie_id: '',
      image: ''
    },
    commentData: {
      body: '',
      quote_id: ''
    }
  })
})
