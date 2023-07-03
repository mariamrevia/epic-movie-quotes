<template>
  <h1 class="text-white text-2 mt-2">{{ props.heading }}</h1>
  <hr class="w-full h-0.05 bg-dark-gray border-none mt-1.25" />
  <div class="flex flex-row gap-2 items-center mt-1.25 mb-1.25 w-full justify-start">
    <img class="rounded-full w-4 h-4 border ml-2 bg-dark-gray" />

    <h1 class="text-white">{{ userStore.username }}</h1>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/authUser'
const userStore = useUserStore()

const props = defineProps({
  heading: {
    type: String,
    requred: true,
    default: ''
  }
})
</script>
