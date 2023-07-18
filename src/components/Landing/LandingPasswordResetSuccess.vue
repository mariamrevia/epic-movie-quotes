<template>
  <div
    :class="[
      'modal-wrapper flex justify-center',
      { 'modal-wrapper--active': isModalActive('passwordResetSuccessActive') }
    ]"
    @click="closeModal"
  >
    <div class="h-screen w-screen flex justify-center md:h-0 md:w-0 bg-black">
      <LandingModal
        class="md:w-33.6 w-22 h-23.4 z-10 mt-5 md:mt-13.6 fixed flex flex-col items-center justify-center bg-gray md:bg-gray rounded-lg"
        :modalActive="isModalActive('passwordResetSuccessActive')"
      >
        <IconDone />
        <h2 class="text-white text-2 mt-1.5">{{ $t('passwordReset.reset_success.success') }}</h2>
        <p class="mt-4 text-white w-22 md:w-96 text-center">
          {{ $t('passwordReset.reset_success.note') }}
        </p>
        <button
          type="button"
          @click="goToLogIn"
          class="bg-red w-20 h-2.3 border-none rounded-md text-white mt-1.5"
        >
          {{ $t('passwordReset.reset_success.log_in') }}
        </button>
      </LandingModal>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal'
import IconDone from '@/components/icons/IconDone.vue'
import LandingModal from '@/components/ui/LandingModal.vue'

const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive
const closeModal = (event) => {
  if (event.target) {
    modalStore.closeModal('passwordResetSuccessActive')
  }
}
const goToLogIn = () => {
  modalStore.openModal('loginModalActive')
}
</script>
