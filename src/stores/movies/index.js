import { defineStore } from 'pinia'
import actions from './actions'
export const useMovieStore = defineStore('movies', {
  state: () => ({
    movieData: []
  }),

  actions: actions
})
