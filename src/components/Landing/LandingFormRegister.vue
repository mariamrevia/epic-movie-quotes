<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('registerModalActive') }]"
    @click="closeModal"
  >
    <LandingModal
      class="flex flex-col items-center"
      :modalActive="isModalActive('registerModalActive')"
    >
      <Form
        @submit="handleSubmit"
        class="w-37.5 h-44 z-10 fixed flex flex-col items-center bg-gray rounded-lg mt-7.4"
      >
        <div class="flex flex-col items-center">
          <h1 class="text-white text-2 mt-3.3">Create and Account</h1>
          <p class="text-dark-gray">Start your journey!</p>
          <InputText
            name="username"
            label="Name*"
            v-model="registerStore.username"
            rules="required|minLength:3|maxLength:15"
          />
          <InputText
            name="email"
            v-model="registerStore.email"
            label="Email*"
            rules="required|email"
          />
          <InputText
            v-model="registerStore.password"
            name="password"
            label="Password*"
            type="password"
            rules="required"
          />
          <InputText
            v-model="registerStore.confirm_password"
            name="password_confirmation"
            label="Confirm Password*"
            type="password"
            rules="required|confirmed:password"
          />
          <button type="submit" class="w-22 mt-1.5 h-2.3 bg-red border-none rounded-md text-white">
            Get started
          </button>
          <button
            type="button"
            @click="registerWithGoogle"
            class="w-22 mt-1.5 h-2.3 border rounded-md text-white"
          >
            Sign Up with Google
          </button>
          <div class="flex flex-row">
            <p class="mt-2 text-dark-gray">Already have an accoun?</p>
            <button type="button" @click="logIn" class="text-white flex items-end ml- 0.5">
              Log In
            </button>
          </div>
        </div>
      </Form>
    </LandingModal>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import { useModalStore } from '@/stores/modal/index.js'
import { useRegisterStore } from '@/stores/register'
import InputText from '@/components/ui/InputText.vue'
import { register } from '@/services/api/auth.js'
import { authGoogle } from '@/services/api/oauth'
import csrf from '@/services/api/csrf.js'
import LandingModal from '@/components/ui/LandingModal.vue'

const registerStore = useRegisterStore()
const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive
const logIn = () => {
  modalStore.openModal('loginModalActive')
}

const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('registerModalActive')
  }
}

const handleSubmit = async (values) => {
  try {
    await csrf.getCookie()
    const response = await register(
      values.username,
      values.email,
      values.password,
      values.password_confirmation
    )
    if (response.status === 200) {
      modalStore.openModal('emailSentModalActive')
    }
    console.log('sdfsdfs')
  } catch (error) {
    console.log(error)
  }
}
const registerWithGoogle = async () => {
  try {
    await csrf.getCookie()
    await authGoogle()
  } catch (error) {
    console.log(error)
  }
}
</script>
