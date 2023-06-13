<template>
  <div
    ref="modalWrapper"
    :class="[
      'modal-wrapper flex justify-center',
      { 'modal-wrapper--active': isModalActive('emailSentModalActive') }
    ]"
    @click="closeModal"
  >
    <div class="h-screen w-screen flex justify-center md:h-0 md:w-0 bg-black">
      <LandingModal
        class="md:w-33.6 w-22 h-23.4 z-10 mt-5 md:mt-13.6 fixed flex flex-col items-center justify-center bg-gray md:bg-gray rounded-lg"
        :modalActive="isModalActive('emailSentModalActive')"
      >
        <iconCheckSend />
        <h2 class="text-white text-2 mt-1.5">Thank You!</h2>
        <p class="mt-4 text-white w-60 md:w-96 text-center">
          Please check your email and follow the instructions to activate your account.
        </p>
        <button
          type="button"
          class="bg-red md:w-22 w-56 h-2.3 border-none rounded-md text-white mt-1.5"
        >
          Go to my Email
        </button>
      </LandingModal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useModalStore } from '@/stores/modal'
import iconCheckSend from '@/components/icons/IconCheckSend.vue'
import LandingModal from '@/components/ui/LandingModal.vue'

const modalWrapper = ref(null)
const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive
const closeModal = (event) => {
  if (event.target === modalWrapper.value) {
    modalStore.closeModal('emailSentModalActive')
  }
}
</script>
