<template>
  <div
    :class="[
      'modal-wrapper overflow-y-auto',
      { 'modal-wrapper--active': isModalActive('editQuoteModalActive') }
    ]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive('editQuoteModalActive')">
      <Form
        @submit="submitData"
        v-for="quote in getFilteredQuotes"
        :key="quote.id"
        class="md:w-60 w-full z-10 fixed flex flex-col md:mt-5 pb-13 md:pb-4 items-center bg-darkgray rounded-lg"
      >
        <div class="flex flex-row gap-2 absolute left-3 top-3.3">
          <IconDelete @click="quoteDelete(quote.id)" />
          <p class="md:flex hidden">{{ $t('quote.delete') }}</p>
        </div>
        <HeaderEditAdd modalName="editQuoteModalActive" :heading="$t('quote.edit_quote')" />
        <TextAreaBase
          name="body[en]"
          v-model="quote.body.en"
          lang="Eng"
          rules="required|alphabetEn"
        />
        <TextAreaBase
          name="body[ka]"
          v-model="quote.body.ka"
          lang="Geo"
          rules="required|alphabetKa"
        />
        <div
          class="md:w-56 mt-1.25 rounded-md border-0.1 flex items-center text-white border-gray focus-within:ring focus:shadow-shadow outline-none"
        >
          <img class="md:w-56 md:h-32 w-20 h-19" :src="imageUrl || initialImageUrl" />
        </div>

        <Field
          :id="quote.id"
          class="absolute hidden top-[70%]"
          name="image"
          type="file"
          @change="onFileChange"
        />

        <label
          :for="quote.id"
          class="bg-black rounded-lg flex flex-col justify-center items-center opacity-70 h-5 w-8.3 absolute top-[60%]"
        >
          <IconPhoto />
          {{ $t('quote.choose_image') }}</label
        >
        <ButtonBase type="submit" :text="$t('quote.save_changes')" />
      </Form>
    </LandingModal>
  </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import { useModalStore } from '@/stores/modal'
import { getMovies } from '@/services/api/movies.js'
import { computed, ref } from 'vue'
import { updateQuotes } from '@/services/api/quotes.js'
import { deleteQuote } from '@/services/api/quotes'
import { useMovieStore } from '@/stores/movies/index.js'
import LandingModal from '@/components/ui/LandingModal.vue'
import TextAreaBase from '@/components/ui/TextAreaBase.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import HeaderEditAdd from '@/components/shared/HeaderEditAdd.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconPhoto from '@/components/icons/IconPhoto.vue'

const props = defineProps({
  quoteToEdit: {
    type: Object,
    required: true
  },
  movie: {
    type: Object,
    required: true
  }
})

const editQuote = computed(() => (props.movie ? { ...props.movie } : null))
const modalStore = useModalStore()
const movieStore = useMovieStore()
const imageUrl = ref(null)
const isModalActive = modalStore.isModalActive

const getFilteredQuotes = computed(() => {
  if (props.quoteToEdit && editQuote) {
    return editQuote.value.quotes.filter((quote) => quote.id === props.quoteToEdit)
  }
  return []
})
const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('editQuoteModalActive')
  }
}

const image = ref(null)
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  }
  image.value = file
}
const emits = defineEmits(['movieUpdated'])
const submitData = async () => {
  try {
    const response = await updateQuotes({
      body: {
        en: getFilteredQuotes.value[0].body.en,
        ka: getFilteredQuotes.value[0].body.ka
      },
      image: image.value ? image.value : getFilteredQuotes.value[0].image,
      id: props.quoteToEdit
    })
    if (response.status === 200) {
      modalStore.closeModal('editQuoteModalActive')
    }

    const responseMovie = await getMovies()
    const movieQuote = responseMovie.data.data.find((movie) => movie.id === editQuote.value.id)
    movieStore.setMovies([movieQuote])
    emits('movieUpdated', movieQuote)
  } catch (error) {
    console.log(error)
  }
}
const quoteToDelete = ref(null)
const quoteDelete = async (id) => {
  quoteToDelete.value = id
  try {
    await deleteQuote(quoteToDelete.value)
  } catch (error) {
    console.log(error)
  }
}

const initialImageUrl = computed(() => {
  if (getFilteredQuotes.value.length > 0) {
    const image = getFilteredQuotes.value[0].image
    if (image) {
      return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
    }
  }
  return ''
})
</script>
