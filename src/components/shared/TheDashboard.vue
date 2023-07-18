<template>
  <div class="w-22 h-31 p-12 flex flex-col fixed">
    <div class="flex flex-row">
      <img
        :src="authUserStore.google_id ? authUserStore.image : imageUrl"
        @onChange="onFileChange"
        :class="
          isActivePage('profile')
            ? 'h-3.6 w-3.6 border-red-700 bg-slate-400 border-2 rounded-full'
            : 'h-3.6 w-3.6 border-none bg-slate-400 border-2 rounded-full'
        "
      />
      <div class="flex flex-col items-start ml-2.5">
        <h2 class="text-white h-6 flex text-1.5">{{ authUserStore.username }}</h2>
        <p class="text-white cursor-pointer text-1 mt-4" @click="navigateTo('profile')">
          {{ $t('dashboard.edit_profile') }}
        </p>
      </div>
    </div>

    <div class="flex flex-row mt-2 ml-4 items-center">
      <IconHouse
        :class="isActivePage('newsFeed') ? 'h-2 w-2 fill-red-700' : 'h-2 w-2 fill-white'"
      />

      <button
        @click="navigateTo('newsFeed')"
        :class="'text-white  cursor-pointer text-1.25 h-6 flex border-none ml-3.3'"
      >
        {{ $t('dashboard.news_feed') }}
      </button>
    </div>

    <div class="flex flex-row items-center mt-2 ml-1.25">
      <IconCamera
        :class="
          isActivePage('list-of-movies' && 'movies') ? 'h-2 w-2 fill-red-700' : 'h-2 w-2 fill-white'
        "
      />
      <button
        class="text-white cursor-pointer h-6 flex border-none text-1.25 ml-3"
        @click="navigateTo('list-of-movies')"
      >
        {{ $t('dashboard.list_movies') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconHouse from '@/components/icons/IconHouse.vue'

const route = useRoute()

const isActivePage = (pageName) => {
  return route.name.includes(pageName)
}
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
