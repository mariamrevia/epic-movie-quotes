<template>
  <div
    :class="[
      'modal-wrapper',
      { 'modal-wrapper--active': isModalActive('passwordResetModalActive') }
    ]"
    @click="closeModal"
  >
    <LandingModal
      class="w-33.6 h-23.4 z-10 fixed flex flex-col items-center justify-center bg-gray rounded-lg"
      :modalActive="isModalActive('passwordResetModalActive')"
    >
      <Form @submit="handleSubmit">
        <h2 class="text-white text-2">Reset Password</h2>
        <InputText
          v-model="resetPasswordDataStore.password"
          name="password"
          label="Password*"
          type="password"
          rules="required"
        />
        <InputText
          v-model="resetPasswordDataStore.password_confirmation"
          name="password_confirmation"
          label="Confirm Password*"
          type="password"
          rules="required|confirmed:password"
        />

        <p class="mt-4 text-white">Your account has been activated.</p>
        <button type="submit" class="bg-red w-22 h-2.3 border-none rounded-md text-white mt-1.5">
          Reset Password
        </button>
      </Form>
    </LandingModal>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import InputText from '@/components/ui/InputText.vue'
import LandingModal from '@/components/ui/LandingModal.vue'
import { usePasswordResetStore } from '@/stores/passwordReset'
import { useModalStore } from '@/stores/modal'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { resetPassword } from '@/services/api/auth.js'
import csrf from '@/services/api/csrf.js'

const modalStore = useModalStore()
const resetPasswordDataStore = usePasswordResetStore()
const isModalActive = modalStore.isModalActive

const route = useRoute()
onMounted(() => {
  const token = route.query.token
  if (token) {
    modalStore.openModal('passwordResetModalActive')
  }
})

const handleSubmit = async (values) => {
  const token = route.query.token
  const email = route.query.email
  try {
    await csrf.getCookie()
    const response = await resetPassword({
      password: values.password,
      email: email,
      password_confirmation: values.password_confirmation,
      token: token
    })
    if (response.status === 200) {
      modalStore.openModal('emailSentModalActive')
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
</script>
