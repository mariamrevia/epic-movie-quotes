<template>
  <div
    :class="[
      'modal-wrapper flex justify-center',
      { 'modal-wrapper--active': isModalActive('passwordModalActive') }
    ]"
    @click="closePasswordModal"
  >
    <div class="h-screen w-screen flex justify-center md:h-0 md:w-0 bg-landingPage">
      <LandingModal
        class="flex flex-col items-center align-middle"
        :modalActive="isModalActive('passwordModalActive')"
      >
        <Form
          @submit="handleSubmit"
          class="md:w-37.5 w-full h-25 z-10 fixed flex flex-col mt-5 md:mt-13.6 items-center justify-center md:bg-gray bg-gradient rounded-lg"
        >
          <iconcheckSend />
          <h2 class="text-2 text-white mt-1.5">{{ $t('passwordReset.forgot_password') }}</h2>
          <InputText name="email" v-model="resetPasswordEmailStore.email" rules="required|email" />
          <p class="mt-4 text-dark-gray w-96 text-center">
            {{ $t('passwordReset.note_instractions') }}
          </p>
          <LandingModalButton type="submit" text="Send instructions" />

          <button @click="goToLogIn" class="border-none text-dark-gray mt-6">
            {{ $t('passwordReset.back_log_in') }}
          </button>
        </Form>
      </LandingModal>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import { useModalStore } from '@/stores/modal'
import InputText from '@/components/ui/InputText.vue'
import LandingModal from '@/components/ui/LandingModal.vue'
import LandingModalButton from '@/components/ui/LandingModalButton.vue'
import { useResetPasswordEmailStore } from '@/stores/passwordEmailVerify'
import { resetPasswordVerifyEmail } from '@/services/api/auth.js'
import csrf from '@/services/api/csrf.js'
import iconcheckSend from '@/components/icons/IconCheckSend.vue'

const resetPasswordEmailStore = useResetPasswordEmailStore()
const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive
console.log(resetPasswordEmailStore)

const handleSubmit = async (value) => {
  try {
    await csrf.getCookie()
    const response = await resetPasswordVerifyEmail(value.email)
    if (response.status === 200) {
      modalStore.openModal('passwordEmailSentModalActive')
    }
    console.log('sdfsdfs')
  } catch (error) {
    console.log(error)
  }
}
const goToLogIn = () => {
  modalStore.openModal('loginModalActive')
}
const closePasswordModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('passwordModalActive')
  }
}
</script>
