<template>
  <DashboardLayout>
    <div class="flex flex-col md:ml-4.4 md:mr-4.4 m-auto md:mt-2">
      <div class="flex items-center h-3.3 md:mt-4.4 mt-6 justify-between">
        <div class="flex flex-row items-center mb-1.25 gap-2">
          <p class="text-white md:text-1.5 text-1.25">{{ $t('movie.list_of_movie') }}</p>
          <!-- <p class="text-white text-1.5">
            {{ $t('movie.total') }} ({{ movieStore.movieData.length }})
          </p> -->
        </div>
        <div class="flex flex-row items-center">
          <div class="md:flex flex-row gap-2 ml-1.5 hidden">
            <IconSearch />
            <input
              class="bg-transparent relative outline-none text-white"
              type="text"
              v-model="searchQuery"
              @input="performSearch"
              :placeholder="$t('movie.movid_search')"
            />
          </div>
          <button
            @click="toggleAddMovieModal"
            class="bg-red ml-1.25 w-9.7 md:text-1 text-1 h-2.3 border-none rounded-md text-white"
          >
            {{ $t('movie.add_movie') }}
          </button>
        </div>
      </div>
      <div
        class="md:grid grid-cols-3 gap-3 md:mt-0 mt-2 flex flex-col rounded-md justify-center align-middle w-full"
      >
        <div
          class="rounded-md border-none"
          @click="navigate(movie.id)"
          v-for="movie in movieStore.movieData"
          :key="movie.id"
        >
          <img
            class="md:w-27.5 md:h-23.4 w-22 h-19 object-fit border-none rounded-xl"
            :src="getImageURL(movie.image)"
            alt="Movie Image"
          />
          <div class="flex flex-row mt-1 items-center align-middle">
            <h2 class="text-white text-1.5 flex items-center">
              {{ $i18n.locale === 'en' ? movie.name?.en : movie.name?.ka }}
            </h2>
            <p class="text-white text-1.5 flex items-center ml-2">({{ movie.year }})</p>
          </div>
          <div class="flex flex-row items-center text-1.25 gap-2 mt-1">
            <p class="text-white">{{ movie.quotes.length }}</p>
            <IconChat />
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
import IconSearch from '@/components/icons/IconSearch.vue'
import IconChat from '@/components/icons/IconChat.vue'
import { getSearchResults } from '@/services/api/movies.js'
import { getMovies } from '@/services/api/movies.js'
import { onMounted, ref } from 'vue'
import { useMovieStore } from '@/stores/movies/index.js'
import { useModalStore } from '@/stores/modal/index.js'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'

const movieStore = useMovieStore()
const router = useRouter()

const searchQuery = ref('')
const searchResults = ref([])
const debouncedSearch = debounce(performSearch, 1000)

async function performSearch() {
  if (searchQuery.value.length > 0) {
    try {
      const response = await getSearchResults(searchQuery.value)
      searchResults.value = response.data
      console.log(searchResults.value)
      movieStore.movieData = response.data.data.map((movie) => ({
        ...movie
      }))
    } catch (error) {
      console.error(error)
    }
  }
}

onMounted(async () => {
  try {
    const response = await getMovies()
    const data = response.data
    movieStore.setMovies(data.data)
    movieStore.setGenres(data.genres)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
  debouncedSearch()
})

const getImageURL = (image) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
}

const modalStore = useModalStore()

const toggleAddMovieModal = () => {
  modalStore.openModal('AddMovieModalActive')
  console.log('sdfsdf')
}

const navigate = (id) => {
  router.push(`/movie/${id}`)
}
</script>
