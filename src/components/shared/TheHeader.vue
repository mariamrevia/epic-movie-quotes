<template>
  <div class="w-screen flex flex-row mt-2 justify-between z-10 fixed">
    <h2 class="text-caramel md:ml-4.4 items-center ml-4 flex">{{ $t('landing.movie_quotes') }}</h2>
    <div class="md:mr-4.4 mr-4 flex flex-row">
      <LanguageSwitch />
      <button
        type="button"
        @click="toggleRegisterModal"
        class="md:w-6.8 w-5.5 mr-4 h-2.3 bg-red border-none rounded-md text-white"
      >
        {{ $t('landing.sign_up') }}
      </button>
      <button @click="toggleLoginModal" class="md:w-6.8 w-5.5 h-2.3 border rounded-md text-white">
        {{ $t('landing.log_in') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal/index.js'
import LanguageSwitch from './LanguageSwitch.vue'
const Modal = useModalStore()
const toggleRegisterModal = () => {
  Modal.openModal('registerModalActive')
}
const toggleLoginModal = () => {
  Modal.openModal('loginModalActive')
}
</script>
