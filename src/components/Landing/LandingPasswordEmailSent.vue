<template>
  <div
    ref="modalWrapper"
    :class="[
      'modal-wrapper flex justify-center',
      { 'modal-wrapper--active': isModalActive('passwordEmailSentModalActive') }
    ]"
    @click="closeModal"
  >
    <div class="h-screen w-screen flex justify-center md:h-0 md:w-0 bg-black">
      <LandingModal
        class="md:w-33.6 w-22 h-23.4 z-10 mt-5 md:mt-13.6 fixed flex flex-col items-center justify-center bg-gray md:bg-gray rounded-lg"
        :modalActive="isModalActive('passwordEmailSentModalActive')"
      >
        <IconCheckSend />
        <h2 class="text-white text-2 mt-1.5">{{ $t('passwordReset.email_sent.thanks') }}</h2>
        <p class="mt-4 text-white md:w-33.6 w-22 text-center">
          {{ $t('passwordReset.email_sent.note') }}
        </p>
        <a
          href="https://mail.google.com/"
          class="bg-red w-22 h-2.3 border-none flex items-center justify-center rounded-md text-white mt-1.5"
          target="_blank"
        >
          {{ $t('passwordReset.email_sent.go_to_email') }}</a
        >
      </LandingModal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useModalStore } from '@/stores/modal'
import IconCheckSend from '@/components/icons/IconCheckSend.vue'
import LandingModal from '@/components/ui/LandingModal.vue'
const modalWrapper = ref(null)
const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive
const closeModal = (event) => {
  if (event.target === modalWrapper.value) {
    modalStore.closeModal('passwordEmailSentModalActive')
  }
}
</script>
