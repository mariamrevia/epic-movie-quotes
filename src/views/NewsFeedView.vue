<template>
  <dashboardLayout>
    <div class="flex flex-row w-88 items-center mt-2">
      <div class="w-50 h-3.25 bg-#24222F rounded-lg text-white flex flex-row gap-2 items-center">
        <iconPencil class="ml-2" @click="toggleAddQuoteModal" />
        write new quote
      </div>
      <div class="flex flex-row gap-2 ml-1.5">
        <IconSearch />
        <input
          class="bg-transparent outline-none text-white"
          type="text"
          v-model="searchQuery"
          @input="performSearch"
          placeholder="Search by"
        />
      </div>
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
import IconSearch from '@/components/icons/IconSearch.vue'
import { useModalStore } from '@/stores/modal/index.js'
import { useQuoteStore } from '@/stores/quotes/index.js'
import { getSearchResults } from '@/services/api/quotes.js'
import { onMounted, ref } from 'vue'
import { debounce } from 'lodash'

const modalStore = useModalStore()
const quoteStore = useQuoteStore()
const searchQuery = ref('')
const searchResults = ref([])
const debouncedSearch = debounce(performSearch, 1000)

async function performSearch() {
  if (searchQuery.value.length > 0) {
    try {
      const response = await getSearchResults(searchQuery.value)
      searchResults.value = response.data
      console.log(searchResults.value)
      quoteStore.quotes = searchResults.value.map((quote) => ({
        ...quote,
        commentData: {
          body: '',
          quote_id: quote.id
        },
        isLiked: false,
        likes: 0
      }))
    } catch (error) {
      console.error(error)
    }
  }
}

onMounted(() => {
  debouncedSearch()
})

const toggleAddQuoteModal = () => {
  modalStore.openModal('addQuoteModalActive')
}
</script>
