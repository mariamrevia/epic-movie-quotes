<template>
  <div class="bg-lightBlack h-full w-full">
    <div class="relative">
      <HeaderDashboard />
    </div>
    <button @click="toggleListDiv" class="z-10 absolute top-3 md:hidden flex left-3">
      <IconList />
    </button>
    <div class="flex flex-row h-full w-full justify-center">
      <div
        :class="
          listDivVisible
            ? 'md:h-screen absolute top-2 h-41 w-22 md:w-17.5 left-0 bg-lightBlack md:flex flex-col'
            : 'md:h-screen h-41 w-22 md:w-17.5 bg-lightBlack md:flex flex-col hidden'
        "
      >
        <div class="flex flex-row left-4.4 ml-13 top-9 absolute">
          <div class="h-1.3 w-1.3 border-white border-2 rounded-full"></div>
          <h2 class="text-white h-6 flex ml-2">{{ authUserStore.username }}</h2>
        </div>

        <div class="flex flex-row left-4.4 absolute top-12">
          <IconHouse class="h-1.3 w-1.3" />
          <button @click="navigateTo('newsFeed')" class="text-white h-6 flex border-none ml-2">
            news feed
          </button>
        </div>

        <div class="flex flex-row absolute left-4.4 top-14 items-center">
          <IconCamera class="h-1.3 w-1.3" />
          <button
            class="text-white h-6 flex border-none ml-2"
            @click="navigateTo('list-of-movies')"
          >
            List of movies
          </button>
        </div>
      </div>
      <div>
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
  }
}
</script>
