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
      class="xl:w-60 lg:w-45 w-25 h-48 flex flex-col md:mt-5 pb-13 md:pb-4 items-center bg-[#11101A] rounded-lg"
    >
      <HeaderEditAdd modalName="addQuoteModalActive" :heading="$t('quote.new_quote')" />
      <TextAreaBase
        name="body[en]"
        lang="Eng"
        placeholder="Start create a new quote"
        v-model="quoteStore.quoteData.body.en"
        rules="required|alphabetEn"
      />
      <TextAreaBase
        name="body[ka]"
        lang="Geo"
        placeholder="შექმენი ახალი ციტატა"
        v-model="quoteStore.quoteData.body.ka"
        rules="required|alphabetKa"
      />
      <imageUpload
        v-model="quoteStore.quoteData.image"
        name="image"
        :rules="quoteStore.quoteData.image ? '' : 'required'"
        @update:imageUpload="updateImageUpload"
      />

      <ErrorMessage class="text-red-700" name="image" />

      <Field
        class="xl:w-56 lg:w-37.5 w-20 h-2.3 rounded-md border-0.1 placeholder-white text-white bg-transparent border-dark-gray bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
        name="movie_id"
        :rules="quoteStore.quoteData.movie ? '' : 'required'"
        v-model="quoteStore.quoteData.movie"
      >
        <div
          @click="toggleDropdown"
          class="xl:w-56 lg:w-37.5 w-20 h-5 py-4 mt-1.25 rounded-md items-center border-0.1 gap-2 placeholder-white text-white bg-black relative border-dark-gray border-none focus-within:ring focus:shadow-shadow outline-none flex flex-row"
        >
          <div class="text-white md:text-1.5 text-1.25 ml-2 flex flex-row items-center gap-2">
            <IconMovie class="h-2 w-2" />
            {{ movieTitle ? movieTitle : $t('quote.choose_movie') }}
          </div>

          <div
            class="xl:w-56 lg:w-37.5 w-20 bg-lightBlack text-white absolute z-50 md:top-4.4 top-4 no-scrollbar overflow-y-auto rounded-b-lg p-3 pr-2"
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
      <ButtonBase type="submit" :text="$t('quote.post')" />
    </Form>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal/index.js'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useQuoteStore } from '@/stores/quotes/index.js'
import { useMovieStore } from '@/stores/movies/index.js'
import { getMovies } from '@/services/api/movies.js'
import { storeQuotes, getQuotes } from '@/services/api/quotes.js'
import { onMounted, ref } from 'vue'
import TextAreaBase from '@/components/ui/TextAreaBase.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import IconMovie from '@/components/icons/IconMovie.vue'
import HeaderEditAdd from '@/components/shared/HeaderEditAdd.vue'
import imageUpload from '@/components/shared/ImageUpload.vue'

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
    movieStore.setMovies(data.data)
  } catch (error) {
    console.error(error)
  }
})

const updateImageUpload = (file) => {
  quoteStore.quoteData.image = file
}
const selectedMovie = (id, title) => {
  quoteStore.quoteData.movie = id
  movieTitle.value = title
}
const submitData = async () => {
  try {
    const storeResponse = await storeQuotes({
      body: {
        en: quoteStore.quoteData.body.en,
        ka: quoteStore.quoteData.body.ka
      },
      image: quoteStore.quoteData.image,
      movie_id: quoteStore.quoteData.movie
    })

    if (storeResponse.status === 201) {
      modalStore.closeModal('addQuoteModalActive')
    }
    const response = await getQuotes()
    quoteStore.updateQuotes(response.data.data)

    quoteStore.quotes.forEach((quote) => {
      quote.commentData = {
        body: '',
        quote_id: quote.id
      }
    })
  } catch (errors) {
    console.log(errors)
  }
}
</script>
