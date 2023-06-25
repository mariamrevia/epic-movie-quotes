<template>
  <DashboardLayout>
    <div class="flex flex-col md:ml-4.4 md:mr-4.4 m-auto">
      <div class="flex items-center h-3.3 md:mt-0 mt-3 justify-between">
        <p class="text-white">My List of Movies</p>
        <div>
          <button
            @click="toggleAddMovieModal"
            class="bg-red w-9.7 h-2.3 border-none rounded-md text-white"
          >
            Add Movie
          </button>
        </div>
      </div>
      <div
        class="md:grid grid-cols-3 gap-3 flex flex-col rounded-md justify-center align-middle w-full"
      >
        <div class="rounded-md border-none" v-for="movie in movieStore.movieData" :key="movie.id">
          <img
            class="md:w-27.5 md:h-23.4 w-22 h-19 object-cover border-none rounded-md"
            :src="getImageURL(movie)"
            alt="Movie Image"
          />
          <div class="flex flex-row mt-1 items-center align-middle">
            <h2 class="text-white text-1.5 flex items-center">
              {{ $i18n.locale === 'en' ? movie.name.en : movie.name.ka }}
            </h2>
            <p class="text-white text-1.5 flex items-center ml-3">({{ movie.year }})</p>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  <movieCreate />
</template>

<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue'
import movieCreate from '@/components/movies/MovieCreate.vue'
import { getMovies } from '@/services/api/movies.js'
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies/index.js'
import { useModalStore } from '@/stores/modal/index.js'

const movieStore = useMovieStore()

onMounted(async () => {
  try {
    const response = await getMovies()
    const data = response.data
    movieStore.setMovies(data.movies)
    movieStore.setGenres(data.genres)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
})

const getImageURL = (movie) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${movie.image}`
}

const modalStore = useModalStore()

const toggleAddMovieModal = () => {
  modalStore.openModal('AddMovieModalActive')
  console.log('sdfsdf')
}
</script>
