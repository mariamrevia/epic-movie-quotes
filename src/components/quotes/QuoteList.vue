<template>
  <div class="flex flex-col gap-3 mt-2">
    <div
      v-for="quote in movieQuotes && movieQuotes.quotes"
      :key="quote.id"
      class="w-50 h-15 bg-darkgray text-whiteGray rounded-md"
    >
      <div class="flex flex-row justify-between">
        <div class="flex flex-row items-center gap-7">
          <img
            class="w-14 h-8.75 mt-1.25 ml-1.25 rounded-md"
            :src="getImageURL(quote && quote.image)"
          />
          <p>"{{ quote.body }}"</p>
        </div>
        <div class="relative">
          <IconThreeDots class="flex mr-2 mt-1.25 relative" @click="toggleDashboard(quote.id)" />
          <div
            v-if="quote.id === activeQuoteId"
            class="w-15.6 h-12 bg-#24222F flex flex-col absolute rounded-lg justify-center"
          >
            <div class="flex flex-col ml-2">
              <div class="flex flex-row gap-2">
                <IconEye />
                <span class="text-whiteGray">View Quote</span>
              </div>
              <div class="flex flex-row mt-1.25 gap-2">
                <IconEdit />
                <span class="text-whiteGray">Edit </span>
              </div>
              <div class="flex flex-row mt-1.25 gap-2">
                <IconDelete />
                <span class="text-whiteGray">Delete </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="flex mx-1.25 h-0.05 bg-slate-700 border-none mt-1.25" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconThreeDots from '@/components/icons/IconThreeDots.vue'
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

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
</script>
