<template>
  <dashboardLayout>
    <div
      class="flex flex-row md:w-35 2xl:w-88 w-22 justify-center md:justify-start items-center mt-6.5"
    >
      <div
        class="md:w-43 w-22 text-1.25 h-3.25 md:bg-#24222F bg-transparent rounded-lg text-white flex flex-row gap-2 items-center"
      >
        <iconPencil class="md:ml-2 h-2 w-2 ml-0" @click="toggleAddQuoteModal" />
        {{ $t('quote.write_quote') }}
      </div>
      <TheSearch class="md:flex hidden" />
    </div>
    <QuotePosts />
  </dashboardLayout>
  <quoteCreate />
</template>

<script setup>
import { useModalStore } from '@/stores/modal/index.js'
import dashboardLayout from '@/components/DashboardLayout.vue'
import iconPencil from '@/components/icons/IconPencil.vue'
import quoteCreate from '@/components/quotes/QuoteCreate.vue'
import QuotePosts from '@/components/quotes/QuotePosts.vue'
import TheSearch from '@/components/TheSearch.vue'

const modalStore = useModalStore()

const toggleAddQuoteModal = () => {
  modalStore.openModal('addQuoteModalActive')
}
</script>
