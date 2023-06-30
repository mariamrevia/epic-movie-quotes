<template>
  <DashboardLayout>
    <div class="flex flex-row gap-4 mt-2">
      <div class="flex flex-col text-white">
        <h2 class="mb-1.5 text-1.5 text-whiteGray">Movie discription</h2>
        <img class="w-50 object-center rounded-2xl" :src="getImageURL(movie && movie.image)" />
      </div>
      <div class="text-white">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row">
            <h1 class="text-1.5 text-caramel">
              {{ $i18n.locale === 'en' ? movie && movie.name.en : movie && movie.name.ka }}
            </h1>
            <p class="text-caramel text-1.5 flex items-center ml-3">({{ movie && movie.year }})</p>
          </div>

          <div
            class="flex flex-row bg-#24222F w-10 h-2.7 items-center rounded-md justify-center gap-12"
          >
            <iconEdit @click="toggleEditMovieModal" />

            <iconDelete />
          </div>
        </div>
        <div class="flex flex-row mt-2">
          <div
            v-for="genre in movie && movie.genres"
            :key="genre.id"
            class="text-white flex flex-row justify-between h-1.5 p-2 border ml-1 rounded-sm items-center bg-dark-gray border-none gap-2"
          >
            {{ genre.title }}
          </div>
        </div>
        <h2 class="mt-2 text-whiteGray gap-3 text-1.25">
          Director:
          {{ $i18n.locale === 'en' ? movie && movie.director.en : movie && movie.director.ka }}
        </h2>
        <p class="h-27 w-37.5 mt-2 text-whiteGray">
          {{
            $i18n.locale === 'en' ? movie && movie.description.en : movie && movie.description.ka
          }}
        </p>
      </div>
    </div>
    <div class="flex flex-row mt-2 text-white items-center gap-3">
      <h2 class="text-1.5">Quotes</h2>
      <button
        @click="toggleAddMovieModal"
        class="bg-red w-9.7 h-2.3 border-none rounded-md text-white"
      >
        Add Quote
      </button>
    </div>
    <QuoteList :movie="movie" />
  </DashboardLayout>
  <MovieEdit v-if="movie" :movie="movie" :genres="genres" />
</template>

<script setup>
import { useMovieStore } from '@/stores/movies/index.js'
import { useModalStore } from '@/stores/modal/index.js'
import DashboardLayout from '@/components/DashboardLayout.vue'
import iconDelete from '@/components/icons/IconDelete.vue'
import iconEdit from '@/components/icons/IconEdit.vue'
import MovieEdit from '@/components/movies/MovieEdit.vue'
import QuoteList from '@/components/quotes/QuoteList.vue'
import { getMovies } from '@/services/api/movies.js'
import { onMounted, ref, toRef } from 'vue'
import { useRoute } from 'vue-router'

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
      movie.value = response.data.movies.find((movie) => movie.id === destinationId.value)
      movieStore.setMovies([movie])
      movieStore.setGenres(response.data.genres)
      genres.value = response.data.genres
    }
  } catch (error) {
    console.log(error)
  }
})

const getImageURL = (image) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
}

const toggleEditMovieModal = () => {
  modalStore.openModal('editMovieModalActive')
}
</script>
