export default {
  setMovies(movieData) {
    this.movieData = movieData
    console.log(movieData)
  },
  setGenres(genreData) {
    this.genreData = genreData
    console.log(genreData)
  },
  getMovies(movie) {
    this.movie = movie
    console.log(movie)
  }
}
