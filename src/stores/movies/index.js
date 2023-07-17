import { defineStore } from 'pinia'
import actions from './actions'
export const useMovieStore = defineStore('movies', {
  state: () => ({
    movieData: [],
    genreData: [],
    genreTitle: [],
    movie: [],
    createMovieData: {
      name: {
        en: '',
        ka: ''
      },
      director: {
        en: '',
        ka: ''
      },
      year: null,
      description: {
        en: '',
        ka: ''
      },
      genre: [],
      image: ''
    }
  }),

  actions: actions
})
