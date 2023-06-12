<template>
  <div
    ref="modalWrapper"
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('emailSentModalActive') }]"
    @click="closeModal"
  >
    <ModalLanding
      class="w-37.5 h-23.4 z-10 fixed flex flex-col items-center justify-center bg-gray rounded-lg"
      :modalActive="isModalActive('emailSentModalActive')"
    >
      <h2 class="text-white text-2">Thank You!</h2>
      <p class="mt-4 text-white w-96 text-center">
        Please check your email and follow the instructions to activate your account.
      </p>
      <button type="button" class="bg-red w-22 h-2.3 border-none rounded-md text-white mt-1.5">
        Go to my Email
      </button>
    </ModalLanding>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const modalWrapper = ref(null)
import { useModalStore } from '@/stores/modal'
import ModalLanding from '@/components/ui/LandingModal.vue'
const Modal = useModalStore()
const isModalActive = Modal.isModalActive
const closeModal = (event) => {
  if (event.target === modalWrapper.value) {
    Modal.closeModal('emailSentModalActive')
  }
}
</script>
