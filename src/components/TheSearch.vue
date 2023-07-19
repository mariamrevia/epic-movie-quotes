<template>
  <div class="flex flex-row gap-2 ml-1.5" @click="increase">
    <IconSearch />
    <input
      class="bg-transparent outline-none text-white"
      :class="{ 'md:border-b pb-1 pt-1 2xl:w-40 lg:w-17.5 w-17.5': searchBar }"
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      :placeholder="
        searchBar ? $t('dashboard.search', { at: '@', hash: '#' }) : $t('dashboard.search_by')
      "
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
const emits = defineEmits(['search'])
const searchBar = ref(false)
const increase = () => {
  searchBar.value = !searchBar.value
  emits('search', searchBar.value)
}
</script>
