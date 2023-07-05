import { defineStore } from 'pinia'
import actions from './actions'

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
    }
  }),
  actions: actions
})
