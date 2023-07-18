<template>
  <div class="flex flex-col lg:w-50 md:37.5 w-22 gap-3 mt-2">
    <div
      v-for="quote in movieQuotes && movieQuotes.quotes"
      :key="quote.id"
      class="xl:w-50 lg:w-35 w-22 md:h-15 h-19 bg-darkgray text-whiteGray rounded-md"
    >
      <div class="flex flex-row justify-between">
        <div class="flex md:flex-row flex-col items-center gap-7">
          <img
            class="w-14 h-8.75 mt-1.25 ml-1.25 rounded-md"
            :src="getImageURL(quote && quote.image)"
          />
          <div class="w-full items-start">
            <p class="ml-1.5">"{{ $i18n.locale === 'en' ? quote.body.en : quote.body.ka }}"</p>
          </div>
        </div>
        <div class="flex items-end md:items-start">
          <IconThreeDots
            class="flex mr-2 mt-1.25 relative align-bottom"
            @click="toggleDashboard(quote.id)"
          />
          <div
            v-if="quote.id === activeQuoteId"
            class="w-15.6 h-12 bg-#24222F flex flex-col absolute md:left-75 left-7 mb-2 rounded-lg justify-center"
          >
            <div class="flex flex-col ml-2">
              <div class="flex flex-row gap-2">
                <IconEye @click="toggleQuoteModal(quote.id, 'viewQuoteModalActive')" />
                <span class="text-whiteGray">{{ $t('quote.view_quote') }}</span>
              </div>
              <div class="flex flex-row mt-1.25 gap-2">
                <IconEdit @click="toggleQuoteModal(quote.id, 'editQuoteModalActive')" />
                <span class="text-whiteGray">{{ $t('quote.edit') }} </span>
              </div>
              <div class="flex flex-row mt-1.25 gap-2">
                <IconDelete @click="quoteDelete(quote.id)" />
                <span class="text-whiteGray">{{ $t('quote.delete') }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="flex mx-1.25 h-0.05 bg-slate-700 border-none mt-1.25" />
      <div class="flex flex-row gap-4 mt-1.25 ml-1.25">
        <div class="flex flex-row items-center gap-2">
          <p>{{ quote.comments.length }}</p>
          <IconComment class="h-2 w-2" />
        </div>
        <div class="flex flex-row items-center gap-2">
          <p>{{ quote.likes.length }}</p>
          <IconLike class="h-2 w-2 fill-white" />
        </div>
      </div>

      <QuoteEdit :quoteToEdit="quoteToEdit" :movie="movie" />
      <QuoteView :quoteToEdit="quoteToEdit" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import QuoteEdit from '@/components/quotes/QuoteEdit.vue'
import { useModalStore } from '@/stores/modal'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconThreeDots from '@/components/icons/IconThreeDots.vue'
import { deleteQuote } from '@/services/api/quotes'
import QuoteView from '@/components/quotes/QuoteView.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconComment from '@/components/icons/IconComments.vue'
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const movie = ref(props.movie)
const modalStore = useModalStore()
const movieQuotes = computed(() => (props.movie ? { ...props.movie } : null))
const getImageURL = (image) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
}

const toggleDiv = ref(false)
const activeQuoteId = ref(null)

const toggleDashboard = (id) => {
  if (activeQuoteId.value === id) {
    activeQuoteId.value = null
  } else {
    activeQuoteId.value = id
    toggleDiv.value = true
  }
}
const quoteToDelete = ref(null)
const quoteDelete = async (id) => {
  quoteToDelete.value = id
  try {
    await deleteQuote(quoteToDelete.value)
    movie.value.quotes = movie.value.quotes.filter((quote) => quote.id !== id)
  } catch (error) {
    console.log(error)
  }
  return movieQuotes.value
}

const quoteToEdit = ref(null)
const toggleQuoteModal = (quoteId, modalName) => {
  quoteToEdit.value = quoteId
  console.log(quoteToEdit.value)
  modalStore.openModal(modalName)
  console.log('hehe')
}
</script>
