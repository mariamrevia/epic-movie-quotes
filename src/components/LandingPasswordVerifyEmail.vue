<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('passwordModalActive') }]"
    @click="closePasswordModal"
  >
    <LandingModal
      class="flex flex-col items-center align-middle"
      :modalActive="isModalActive('passwordModalActive')"
    >
      <Form
        @submit="handleResetPasswordSubmit"
        class="w-37.5 h-25 z-10 fixed flex flex-col mt-13.6 items-center justify-center bg-gray rounded-lg"
      >
        <h2 class="text-2 text-white">Forgot password?</h2>
        <InputText
          class="w-22 h-2.3 rounded-md bg-light-gray mt-7"
          name="email"
          v-model="resetPasswordEmail.email"
          rules="required|email"
        />
        <p class="mt-4 text-dark-gray w-96 text-center">
          Enter the email and we’ll send an email with instructions to reset your password
        </p>
        <button type="submit" class="bg-red w-22 h-2.3 border-none rounded-md text-white mt-1.5">
          Send instructions
        </button>
        <button class="border-none text-dark-gray mt-6">back to Log In</button>
      </Form>
    </LandingModal>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import { useModalStore } from '@/stores/modal'
import InputText from '@/components/ui/InputText.vue'
import LandingModal from '@/components/ui/LandingModal.vue'
import { useResetPasswordEmailStore } from '@/stores/passwordEmailVerify'
import * as Api from '@/services/api/auth.js'
import csrf from '@/services/api/csrf.js'

const resetPasswordEmail = useResetPasswordEmailStore()
const Modal = useModalStore()
const isModalActive = Modal.isModalActive
console.log(resetPasswordEmail)

const handleResetPasswordSubmit = async () => {
  await csrf.getCookie()
  const response = await Api.resetPasswordVerifyEmail(resetPasswordEmail)
  if (response.status === 200) {
    Modal.openModal('emailModalActive')
  }
  console.log('sdfsdfs')
}

const closePasswordModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    Modal.closeModal('passwordModalActive')
  }
}
</script>
