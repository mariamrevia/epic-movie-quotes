<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('editQuoteModalActive') }]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive('editQuoteModalActive')">
      <Form
        @submit="submitData"
        v-for="quote in getFilteredQuotes"
        :key="quote.id"
        class="w-60 z-10 fixed flex flex-col md:mt-13.6 pb-13 md:pb-4 items-center bg-darkgray rounded-lg"
      >
        <div class="flex flex-row gap-2 absolute left-3 top-3.3">
          <IconDelete />
          <p>Delete</p>
        </div>
        <HeaderEditAdd heading="Edit quote" />
        <TextAreaBase name="body[en]" v-model="quote.body.en" lang="Eng" rules="required" />
        <TextAreaBase name="body[ka]" v-model="quote.body.ka" lang="Geo" rules="required" />
        <div
          class="w-56 mt-1.25 rounded-md border-0.1 flex items-center text-white border-[#6C757D] focus-within:ring focus:shadow-shadow outline-none"
        >
          <div>
            <img class="w-56 h-32" :src="imageUrl || initialImageUrl" />
          </div>
        </div>

        <Field
          id="file-upload"
          class="absolute top-[70%]"
          name="image"
          type="file"
          @change="onFileChange"
        />
        <label for="file-upload" class="bg-black h-9 w-10 absolute top-[70%]">Choose Image</label>
        <ButtonBase type="submit" text="Save Changes" />
      </Form>
    </LandingModal>
  </div>
</template>

<script setup>
import LandingModal from '@/components/ui/LandingModal.vue'
import TextAreaBase from '@/components/ui/TextAreaBase.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import HeaderEditAdd from '@/components/shared/HeaderEditAdd.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { Form, Field } from 'vee-validate'
import { useModalStore } from '@/stores/modal'
import { computed, ref } from 'vue'
import { updateQuotes } from '@/services/api/quotes.js'

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

const imageUrl = ref(null)
const image = ref(null)
const editQuote = computed(() => (props.movie ? { ...props.movie } : null))
const modalStore = useModalStore()
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

const submitData = async () => {
  try {
    await updateQuotes({
      body: {
        en: getFilteredQuotes.value[0].body.en,
        ka: getFilteredQuotes.value[0].body.ka
      },
      image: image.value,
      id: props.quoteToEdit
    })
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

const onFileChange = (event) => {
  const file = event.target.files[0]
  image.value = file
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  }
}
</script>
