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
      class="md:w-60 w-full fixed flex flex-col md:mt-5 pb-13 md:pb-10 items-center bg-[#11101A] rounded-lg"
    >
      <HeaderEditAdd modalName="createQuoteModalActive" :heading="$t('quote.add_quote')" />
      <div
        class="flex flex-row gap-4 xl:w-56 lg:w-37.5 md:bg-transparent bg-black md:p-0 p-3 w-20 m-auto"
      >
        <img
          class="md:w-18 w-7 h-5 md:h-10 flex self-start rounded-xl"
          :src="getImageURL(movie.image)"
        />
        <div class="text-white">
          <div class="flex flex-row justify-between">
            <div class="flex flex-row">
              <h1 class="md:text-1.5 text-1 text-caramel">
                {{ $i18n.locale === 'en' ? movie && movie.name.en : movie && movie.name.ka }}
              </h1>
              <p class="text-caramel md:text-1.5 text-1 flex items-center ml-1.5">
                ({{ movie && movie.year }})
              </p>
            </div>
          </div>
          <div class="flex flex-row md:mt-2 mt-0 gap-1">
            <div
              v-for="genre in movie && movie.genres"
              :key="genre.id"
              class="text-white flex flex-row justify-between h-1.5 p-2 border md:ml-1 ml-0 rounded-sm items-center bg-dark-gray border-none gap-2"
            >
              {{ genre.title }}
            </div>
          </div>
          <h2 class="md:mt-2 mt-0 text-whiteGray gap-3 md:text-1.5 text-1">
            {{ $t('movie.director') }}
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

      <imageUpload
        v-model="quoteStore.quoteData.image"
        name="image"
        :rules="quoteStore.quoteData.image ? '' : 'required'"
        @update:imageUpload="updateImageUpload"
      />

      <ButtonBase type="submit" :text="$t('quote.add_quote')" />
    </Form>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal/index.js'
import { Form } from 'vee-validate'
import { useQuoteStore } from '@/stores/quotes/index.js'
import { useMovieStore } from '@/stores/movies/index.js'
import { getMovies } from '@/services/api/movies.js'
import { storeQuotes } from '@/services/api/quotes.js'
import { onMounted, computed } from 'vue'
import TextAreaBase from '@/components/ui/TextAreaBase.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import HeaderEditAdd from '@/components/shared/HeaderEditAdd.vue'
import imageUpload from '@/components/shared/ImageUpload.vue'

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
    const response = await storeQuotes({
      body: {
        en: quoteStore.quoteData.body.en,
        ka: quoteStore.quoteData.body.ka
      },
      image: quoteStore.quoteData.image,
      movie_id: movie.value.id
    })

    if (response.data && response.data.data) {
      const createdQuote = response.data.data
      movie.value.quotes.push(createdQuote)
    } else {
      console.error('invalid response')
    }
    console.log(movie.value)
  } catch (errors) {
    console.log(errors)
  }
}

const updateImageUpload = (file) => {
  quoteStore.quoteData.image = file
}
const getImageURL = (image) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
}
</script>
