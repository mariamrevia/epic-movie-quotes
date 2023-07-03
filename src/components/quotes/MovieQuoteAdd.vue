<template>
  <div
    :class="[
      'modal-wrapper flex justify-center',
      { 'modal-wrapper--active': isModalActive('createQuoteModalActive') }
    ]"
    @click="closeModal"
  >
    <Form
      @submit="submitData"
      class="w-60 fixed flex flex-col md:mt-7.4 pb-13 md:pb-10 items-center bg-[#11101A] rounded-lg"
    >
      <HeaderEditAdd heading="Add Quote" />
      <div class="flex flex-row gap-4 w-56 m-auto">
        <img class="w-18 h-10 flex self-start rounded-xl" :src="getImageURL(movie.image)" />
        <div class="text-white">
          <div class="flex flex-row justify-between">
            <div class="flex flex-row">
              <h1 class="text-1.5 text-caramel">
                {{ $i18n.locale === 'en' ? movie && movie.name.en : movie && movie.name.ka }}
              </h1>
              <p class="text-caramel text-1.5 flex items-center ml-3">
                ({{ movie && movie.year }})
              </p>
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
        </div>
      </div>
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

      <ButtonBase type="submit" text="Add Quote" />
    </Form>
  </div>
</template>

<script setup>
import TextAreaBase from '@/components/ui/TextAreaBase.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import HeaderEditAdd from '@/components/shared/HeaderEditAdd.vue'
import { useModalStore } from '@/stores/modal/index.js'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useQuoteStore } from '@/stores/quotes/index.js'
import { useMovieStore } from '@/stores/movies/index.js'
import { getMovies } from '@/services/api/movies.js'
import { storeQuotes } from '@/services/api/quotes.js'
import { onMounted, computed } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const modalStore = useModalStore()
const movieStore = useMovieStore()
const quoteStore = useQuoteStore()

const movie = computed(() => (props.movie ? { ...props.movie } : null))
const isModalActive = modalStore.isModalActive
const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('createQuoteModalActive')
  }
}

onMounted(async () => {
  try {
    const response = await getMovies()
    const data = response.data
    movieStore.setMovies(data.movies)
  } catch (error) {
    console.error(error)
  }
})

const submitData = async () => {
  try {
    await storeQuotes({
      body: {
        en: quoteStore.quoteData.body.en,
        ka: quoteStore.quoteData.body.ka
      },
      image: quoteStore.quoteData.image,
      movie_id: movie.value.id
    })
  } catch (errors) {
    console.log(errors)
  }
}

const getImageURL = (image) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
}
</script>
