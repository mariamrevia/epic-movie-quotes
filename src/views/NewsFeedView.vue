<template>
  <dashboardLayout>
    <div class="flex flex-row w-88 items-center">
      <div
        class="w-48 h-3.25 bg-#24222F mt-2 rounded-lg text-white flex flex-row gap-2 items-center"
      >
        <iconPencil class="ml-2" @click="toggleAddQuoteModal" />

        write new quote
      </div>
      <div></div>
    </div>
  </dashboardLayout>
  <quoteCreate />
</template>

<script setup>
import dashboardLayout from '@/components/DashboardLayout.vue'
import iconPencil from '@/components/icons/IconPencil.vue'
import quoteCreate from '@/components/quotes/QuoteCreate.vue'
import { useModalStore } from '@/stores/modal/index.js'

const modalStore = useModalStore()
const toggleAddQuoteModal = () => {
  modalStore.openModal('addQuoteModalActive')
}
</script>
