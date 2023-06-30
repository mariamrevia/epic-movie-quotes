import { defineStore } from 'pinia'

export const useQuoteStore = defineStore('quotes', {
  state: () => ({
    quotes: [],
    quoteData: {
      body: {
        en: '',
        ka: ''
      },
      movie_id: '',
      image: ''
    }
  })
})
