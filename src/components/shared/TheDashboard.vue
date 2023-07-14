<template>
  <div class="w-22 h-31 p-12 flex flex-col fixed">
    <div class="flex flex-row">
      <img
        :src="authUserStore.google_id ? authUserStore.image : imageUrl"
        @onChange="onFileChange"
        class="h-3.6 w-3.6 border-none bg-slate-400 border-2 rounded-full"
      />
      <div class="flex flex-col items-start ml-2.5">
        <h2 class="text-white h-6 flex text-1.5">{{ authUserStore.username }}</h2>
        <p class="text-white text-1 mt-4" @click="navigateTo('profile')">Edit your profile</p>
      </div>
    </div>

    <div class="flex flex-row mt-2 ml-4 items-center">
      <IconHouse class="h-2 w-2" />
      <button @click="navigateTo('newsFeed')" class="text-white h-6 flex border-none ml-3.3">
        news feed
      </button>
    </div>

    <div class="flex flex-row items-center mt-2 ml-1.25">
      <IconCamera class="h-2 w-2" />
      <button class="text-white h-6 flex border-none ml-3" @click="navigateTo('list-of-movies')">
        List of movies
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/authUser'

import IconCamera from '@/components/icons/IconCamera.vue'
import IconHouse from '@/components/icons/IconHouse.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const authUserStore = useUserStore()
const router = useRouter()
const navigateTo = (routeName) => {
  if (routeName === 'newsFeed') {
    router.push({ name: routeName })
  } else if (routeName === 'list-of-movies') {
    router.push({ name: routeName })
  } else if (routeName === 'profile') {
    router.push({ name: routeName })
  }
}
const imageUrl = ref(`${import.meta.env.VITE_API_BASE_URL}/storage/${authUserStore.image}`)
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  }
}
</script>
