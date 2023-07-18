<template>
  <div class="flex flex-row gap-2 ml-1.5">
    <IconSearch />
    <input
      class="bg-transparent outline-none text-white"
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      :placeholder="$t('dashboard.search')"
    />
  </div>
</template>

<script setup>
import { getSearchResults } from '@/services/api/quotes.js'
import { useQuoteStore } from '@/stores/quotes/index.js'
import { onMounted, ref } from 'vue'
import { debounce } from 'lodash'
import IconSearch from '@/components/icons/IconSearch.vue'
const quoteStore = useQuoteStore()
const searchQuery = ref('')
const searchResults = ref([])
const debouncedSearch = debounce(performSearch, 1000)

async function performSearch() {
  if (searchQuery.value.length > 0) {
    try {
      const response = await getSearchResults(searchQuery.value)
      searchResults.value = response.data.data
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
</script>
