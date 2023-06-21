<template>
  <DashboardLayout>
    <div class="flex flex-col md:ml-4.4 md:mr-4.4 m-auto">
      <div class="flex items-center h-3.3 md:mt-0 mt-3 justify-between">
        <p class="text-white">My List of Movies</p>
        <div>
          <button class="bg-red w-9.7 h-2.3 border-none rounded-md text-white">Add Movie</button>
        </div>
      </div>

      <div class="md:grid grid-cols-3 gap-3 flex flex-col justify-center align-middle w-full">
        <li v-for="movie in movieStore.movieData" :key="movie.id">
          <img class="md:w-27.5 md:h-23.4 w-22 h-19" :src="movie.image" alt="Movie Image" />
          <h2 class="text-white">{{ movie.name }}</h2>
          <p class="text-white">{{ movie.release_date }}</p>
        </li>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue'
import { getMovies } from '@/services/api/movies.js'
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies/index.js'

const movieStore = useMovieStore()

onMounted(async () => {
  try {
    const response = await getMovies()
    const data = response.data.data
    movieStore.setMovies(data)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
})
</script>
