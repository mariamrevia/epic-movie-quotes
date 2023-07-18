<template>
  <DashboardLayout>
    <div v-if="movie">
      <div class="flex lg:flex-row md:flex-col flex-col gap-4 mt-7.4">
        <div class="flex flex-col text-white">
          <h2 class="mb-1.5 text-1.5 text-whiteGray">{{ $t('movie.movie_discription') }}</h2>
          <img
            class="lg:w-50 md:37.5 w-22 md:h-27 h-23.4 object-center rounded-2xl"
            :src="getImageURL(movie && movie.image) || ''"
          />
        </div>
        <div class="text-white">
          <div class="flex flex-row justify-between">
            <div class="flex flex-row">
              <h1 class="text-1.5 text-caramel">
                {{ $i18n.locale === 'en' ? movie && movie.name.en : movie && movie.name.ka }}
              </h1>
              <p class="text-caramel text-1.5 flex items-center ml-1.5">
                ({{ movie && movie.year }})
              </p>
            </div>

            <div
              class="flex flex-row bg-#24222F md:w-10 w-7 h-2.7 items-center rounded-md justify-center gap-12"
            >
              <iconEdit @click="toggleEditMovieModal" />
              <iconDelete @click="movieDelete(movie.id)" />
            </div>
          </div>
          <div class="flex flex-row mt-2">
            <div
              v-for="genre in movie && movie.genres"
              :key="genre.id"
              class="text-white flex flex-row justify-between h-1.5 p-2 border rounded-sm items-center bg-dark-gray border-none gap-2"
            >
              {{ genre.title }}
            </div>
          </div>
          <h2 class="mt-2 text-whiteGray gap-3 text-1.25">
            {{ $t('movie.director') }}
            {{ $i18n.locale === 'en' ? movie && movie.director.en : movie && movie.director.ka }}
          </h2>
          <p class="xl:h-27 md:h-0 flex xl:w-37.5 md:w-12 w-20 mt-2 text-whiteGray">
            {{
              $i18n.locale === 'en' ? movie && movie.description.en : movie && movie.description.ka
            }}
          </p>
        </div>
      </div>
      <div class="flex md:flex-row flex-col mt-2 text-white md:items-center items-start gap-2">
        <button
          @click="toggleAddQuoteModal"
          class="bg-red w-9.7 h-2.3 flex flex-row items-center justify-center gap-1 border-none rounded-md text-white"
        >
          <IconPlus />
          {{ $t('movie.add_quote') }}
        </button>
        <div class="flex flex-row gap-1 md:mt-0 mt-1.25">
          <h2 class="text-1.5">{{ $t('movie.quotes') }}</h2>
          <p class="text-1.5">Total({{ movie && movie.quotes.length }})</p>
        </div>
      </div>
      <MovieQuoteAdd v-if="movie" :movie="movie" />
      <QuoteList v-if="movie" :movie="movie" @movieUpdated="handleMovieUpdated" />
    </div>
    <h2 class="text-caramel text-4xl mt-9" v-else>Movie was Deleted</h2>
  </DashboardLayout>
  <MovieEdit v-if="movie" :movie="movie" :genres="genres" @movieUpdated="handleMovieUpdated" />
</template>

<script setup>
import { useMovieStore } from '@/stores/movies/index.js'
import { useModalStore } from '@/stores/modal/index.js'
import { getMovies, deleteMovie } from '@/services/api/movies.js'
import { onMounted, ref, toRef } from 'vue'
import { useRoute } from 'vue-router'
import IconPlus from '@/components/icons/IconPlus.vue'
import DashboardLayout from '@/components/DashboardLayout.vue'
import iconDelete from '@/components/icons/IconDelete.vue'
import iconEdit from '@/components/icons/IconEdit.vue'
import MovieEdit from '@/components/movies/MovieEdit.vue'
import QuoteList from '@/components/quotes/QuoteList.vue'
import MovieQuoteAdd from '@/components/quotes/MovieQuoteAdd.vue'

const movieStore = useMovieStore()
const modalStore = useModalStore()
const route = useRoute()

const destinationId = ref(parseInt(toRef(route, 'params').value.id))

const movie = ref(null)
const genres = ref(null)
onMounted(async () => {
  try {
    if (movieStore.movieData.length > 0 && movieStore.genreData.length > 0) {
      movie.value = movieStore.movieData.find((movie) => movie.id === destinationId.value)
      genres.value = movieStore.genreData
    } else {
      const response = await getMovies()
      console.log(response)
      movie.value = response.data.data.find((movie) => movie.id === destinationId.value)
      movieStore.setMovies([movie.value])
      movieStore.setGenres(response.data.genres)
      genres.value = response.data.genres
    }

    console.log(movieStore.movieData.value)
  } catch (error) {
    console.log(error)
  }
})

const handleMovieUpdated = (updatedMovie) => {
  movie.value = updatedMovie
}
const movieToDelete = ref(null)
const movieDelete = async (id) => {
  movieToDelete.value = id
  try {
    await deleteMovie(movieToDelete.value)
    movie.value = null
  } catch (error) {
    console.log(error)
  }

  return movie.value
}
const getImageURL = (image) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
}

const toggleAddQuoteModal = () => {
  modalStore.openModal('createQuoteModalActive')
}
const toggleEditMovieModal = () => {
  modalStore.openModal('editMovieModalActive')
}
</script>
