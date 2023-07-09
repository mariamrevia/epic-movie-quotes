<template>
  <div class="bg-lightBlack h-full w-full">
    <div class="relative">
      <HeaderDashboard />
    </div>
    <button @click="toggleListDiv" class="z-10 absolute top-3 md:hidden flex left-3">
      <IconList />
    </button>
    <div class="flex flex-row h-full w-full">
      <div
        :class="
          listDivVisible
            ? 'md:h-screen absolute top-2 h-41 w-22 md:w-17.5 left-0 bg-lightBlack md:flex flex-col'
            : 'md:h-screen h-41 w-22 md:w-17.5 bg-lightBlack md:flex flex-col hidden'
        "
      >
        <div class="left-4.4 top-7 flex flex-col fixed">
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
            <button
              class="text-white h-6 flex border-none ml-3"
              @click="navigateTo('list-of-movies')"
            >
              List of movies
            </button>
          </div>
        </div>
      </div>
      <div class="ml-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderDashboard from '@/components/shared/HeaderDashboard.vue'
import { useUserStore } from '@/stores/authUser'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconHouse from '@/components/icons/IconHouse.vue'
import IconList from '@/components/icons/IconList.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authUserStore = useUserStore()
const listDivVisible = ref(false)
const router = useRouter()

const toggleListDiv = () => {
  listDivVisible.value = !listDivVisible.value
}

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
