<template>
  <dashboardLayout>
    <div class="flex flex-row lg:w-54 2xl:w-88 sm:w-22 w-14 items-center mt-6.5">
      <div
        class="md:w-50 text-1.25 w-12 h-3.25 md:bg-#24222F bg-transparent rounded-lg text-white flex flex-row gap-2 items-center"
      >
        <iconPencil class="md:ml-2 h-2 w-2 ml-0" @click="toggleAddQuoteModal" />
        write new quote
      </div>
      <TheSearch class="md:flex hidden" />
    </div>
    <QuotePosts />
  </dashboardLayout>
  <quoteCreate />
</template>

<script setup>
import dashboardLayout from '@/components/DashboardLayout.vue'
import iconPencil from '@/components/icons/IconPencil.vue'
import quoteCreate from '@/components/quotes/QuoteCreate.vue'
import QuotePosts from '@/components/quotes/QuotePosts.vue'
// import IconSearch from '@/components/icons/IconSearch.vue'
import { useModalStore } from '@/stores/modal/index.js'
import TheSearch from '@/components/TheSearch.vue'
// import { useQuoteStore } from '@/stores/quotes/index.js'
// import { getSearchResults } from '@/services/api/quotes.js'
// import { onMounted, ref } from 'vue'
// import { debounce } from 'lodash'

const modalStore = useModalStore()
// const quoteStore = useQuoteStore()
// const searchQuery = ref('')
// const searchResults = ref([])
// const debouncedSearch = debounce(performSearch, 1000)

// async function performSearch() {
//   if (searchQuery.value.length > 0) {
//     try {
//       const response = await getSearchResults(searchQuery.value)
//       searchResults.value = response.data.data
//       console.log(searchResults.value)
//       quoteStore.quotes = searchResults.value.map((quote) => ({
//         ...quote,
//         commentData: {
//           body: '',
//           quote_id: quote.id
//         },
//         isLiked: false,
//         likes: 0
//       }))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// onMounted(() => {
//   debouncedSearch()
// })

const toggleAddQuoteModal = () => {
  modalStore.openModal('addQuoteModalActive')
}
</script>
