<template>
  <div class="w-full flex flex-row mt-2 items-center justify-center">
    <h1 class="text-white text-2 flex items-center mr-0 mx-auto">{{ props.heading }}</h1>
    <div class="ml-auto">
      <IconCross
        class="w-2 h-2 md:mr-1.5 justify-self-end mr-0 fill-whiteGray"
        @click="closeModal(modalName)"
      />
    </div>
  </div>
  <hr class="w-full h-0.05 bg-dark-gray border-none mt-1.25" />
  <div class="flex flex-row gap-2 items-center mt-1.25 mb-1.25 w-full justify-start">
    <img
      :src="userStore.google_id ? userStore.image : imageUrl"
      class="rounded-full w-4 h-4 border border-none ml-2 bg-dark-gray"
    />

    <h1 class="text-white">{{ userStore.username }}</h1>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/authUser'
import { ref } from 'vue'
import IconCross from '@/components/icons/IconCross.vue'
const userStore = useUserStore()
const modalStore = useModalStore()
const props = defineProps({
  heading: {
    type: String,
    requred: true,
    default: ''
  },
  modalName: {
    type: String,
    requred: true,
    default: ''
  }
})

const closeModal = (modalName) => {
  modalStore.closeModal(modalName)
}
const imageUrl = ref(`${import.meta.env.VITE_API_BASE_URL}/storage/${userStore.image}`)
</script>
