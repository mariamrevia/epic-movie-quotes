<template>
  <div class="w-screen h-screen bg-darkgray flex flex-col items-center justify-center">
    <IconForbidden />
    <div class="flex flex-col mt-1.5 gap-1 items-center">
      <h1 class="text-white text-3 flex text-center">You shall not pass!</h1>
      <p class="text-white text-1.5 flex text-center">
        Sorry, but you don’t have permission to access this page
      </p>
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
import IconForbidden from '@/components/icons/IconForbidden.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const navigate = () => {
  router.push({ name: 'landing' })
}
</script>
