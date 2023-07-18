<template>
  <div class="w-screen h-screen bg-darkgray flex flex-col items-center justify-center">
    <IconFrame />
    <div class="flex flex-col mt-1.5 gap-1 items-center">
      <h1 class="text-white text-3 flex text-center">Whoops!</h1>
      <p class="text-white text-1.5 flex text-center">We can't see the page you are looking for</p>
      <button
        class="bg-red ml-1.25 w-9.7 md:text-1 mt-1.25 text-1 h-2.3 flex flex-row justify-center gap-1 items-center border-none rounded-md text-white"
        @click="navigate"
      >
        Return Home
      </button>
    </div>
  </div>
</template>

<script setup>
import IconFrame from '@/components/icons/IconFrame.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const navigate = () => {
  router.push({ name: 'landing' })
}
</script>
