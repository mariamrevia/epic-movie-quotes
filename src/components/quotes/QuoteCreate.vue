<template>
  <div
    :class="[
      'modal-wrapper flex justify-center',
      { 'modal-wrapper--active': isModalActive('addQuoteModalActive') }
    ]"
    @click="closeModal"
  >
    <Form
      @submit="submitData"
      class="w-60 fixed flex flex-col md:mt-7.4 pb-13 md:pb-4 items-center bg-[#11101A] rounded-lg"
    >
      <HeaderEditAdd heading="Write new Quote" />
      <TextAreaBase
        name="body[en]"
        lang="Eng"
        placeholder="Start create a new quote"
        v-model="quoteStore.quoteData.body.en"
        rules="required"
      />
      <TextAreaBase
        name="body[ka]"
        lang="Geo"
        placeholder="შექმენი ახალი ციტატა"
        v-model="quoteStore.quoteData.body.ka"
        rules="required"
      />

      <div
        class="w-56 h-5 mt-1.25 rounded-md border-0.1 flex items-center placeholder-white text-white bg-transparent border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
      >
        <label
          for="file-upload"
          class="h-2.6 ml-2 text-center flex p-3 rounded-sm items-center bg-[#9747FF]"
        >
          choose file
        </label>
        <Field
          id="file-upload"
          name="image"
          class="hidden"
          v-model="quoteStore.quoteData.image"
          type="file"
          :rules="quoteStore.quoteData.image ? '' : 'required'"
        />
        <ErrorMessage class="text-red-700" name="image" />
      </div>

      <Field
        class="w-56 h-2.3 rounded-md border-0.1 placeholder-white text-white bg-transparent border-dark-gray bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
        name="movie_id"
        :rules="quoteStore.quoteData.movie ? '' : 'required'"
        v-model="quoteStore.quoteData.movie"
      >
        <div
          @click="toggleDropdown"
          class="w-56 h-5 mt-1.25 rounded-md items-center border-0.1 gap-2 placeholder-white text-white bg-black relative border-dark-gray border-none focus-within:ring focus:shadow-shadow outline-none flex flex-row"
        >
          <div class="text-white text-1.5 ml-2 flex flex-row items-center gap-2">
            <IconMovie />
            {{ movieTitle ? movieTitle : 'Choose Movie' }}
          </div>

          <div
            class="w-56 bg-lightBlack text-white absolute z-50 top-4.4 rounded-b-lg p-3 pr-2"
            v-if="isDropdownOpen"
          >
            <div
              class="p-1 ml-1.5"
              v-for="movies in movieStore.movieData"
              :value="movies.id"
              :key="movies.id"
              @click="
                selectedMovie(movies.id, $i18n.locale === 'en' ? movies.name.en : movies.name.ka)
              "
            >
              {{ $i18n.locale === 'en' ? movies.name.en : movies.name.ka }}
            </div>
          </div>
        </div>

        <ErrorMessage class="text-red-700 mt-1.5" name="movie" />
      </Field>
      <ButtonBase type="submit" text="Post" />
    </Form>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal/index.js'
import { Field, Form, ErrorMessage } from 'vee-validate'
import TextAreaBase from '@/components/ui/TextAreaBase.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import IconMovie from '@/components/icons/IconMovie.vue'
import HeaderEditAdd from '@/components/shared/HeaderEditAdd.vue'
import { useQuoteStore } from '@/stores/quotes/index.js'
import { useMovieStore } from '@/stores/movies/index.js'
import { getMovies } from '@/services/api/movies.js'
import { storeQuotes } from '@/services/api/quotes.js'
import { onMounted, ref } from 'vue'

const modalStore = useModalStore()
const movieStore = useMovieStore()
const quoteStore = useQuoteStore()

const isModalActive = modalStore.isModalActive
const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('addQuoteModalActive')
  }
}

const isDropdownOpen = ref(false)
const movieTitle = ref('')
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
onMounted(async () => {
  try {
    const response = await getMovies()
    const data = response.data
    console.log(data)
    movieStore.setMovies(data.data)
  } catch (error) {
    console.error(error)
  }
})

const selectedMovie = (id, title) => {
  quoteStore.quoteData.movie = id
  movieTitle.value = title
}
const submitData = async () => {
  try {
    await storeQuotes({
      body: {
        en: quoteStore.quoteData.body.en,
        ka: quoteStore.quoteData.body.ka
      },
      image: quoteStore.quoteData.image,
      movie_id: quoteStore.quoteData.movie
    })
  } catch (errors) {
    console.log(errors)
  }
}
</script>
