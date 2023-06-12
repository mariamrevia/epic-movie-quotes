<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('loginModalActive') }]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive('loginModalActive')">
      <Form
        @submit="handleLoginSubmit"
        class="w-37.5 h-35 z-10 fixed flex flex-col mt-13.6 items-center bg-gray rounded-lg"
      >
        <div class="flex flex-col items-center">
          <h1 class="text-white text-2 mt-3.3">Create and Account</h1>
          <p class="text-dark-gray">Welcome back! Please enter your details.</p>
          <InputText
            name="username"
            label="Name*"
            v-model="loginStore.username"
            rules="required|minLength:3|maxLength:15"
          />
          <InputText
            v-model="loginStore.password"
            name="password"
            label="Password*"
            type="password"
            rules="required"
          />

          <div class="flex flex-row justify-between text-white w-full mt-4">
            <div>
              <p>Rememmber me</p>
            </div>
            <div>
              <button type="button" @click="resetPassword">Forgot Password</button>
            </div>
          </div>
          <button type="submit" class="w-22 mt-1.5 h-2.3 bg-red border-none rounded-md text-white">
            Sign In
          </button>
          <button type="submit" class="w-22 mt-1.5 h-2.3 border rounded-md text-white">
            Sign In with Google
          </button>
          <div class="flex flex-row">
            <p class="mt-2 text-dark-gray">Already have an accoun?</p>
            <button type="button" @click="signUp" class="text-white flex items-end ml-0.5">
              Sign Up
            </button>
          </div>
        </div>
      </Form>
    </LandingModal>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import { useLoginStore } from '@/stores/Login'
import { useModalStore } from '@/stores/modal'
//   import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/authUser'
import LandingModal from '@/components/ui/LandingModal.vue'
import InputText from '@/components/ui/InputText.vue'
import * as Api from '@/services/api/auth.js'
import csrf from '@/services/api/csrf.js'

const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive

const signUp = () => {
  modalStore.openModal('registerModalActive')
}

const resetPassword = () => {
  modalStore.openModal('passwordModalActive')
}

const loginStore = useLoginStore()
//   const router = useRouter()

const authUserStore = useUserStore()
const handleLoginSubmit = async (values) => {
  await csrf.getCookie()
  const response = await Api.login(values.username, values.password)
  if (response.status === 200) {
    await authUserStore.fetchUser()

    console.log(response)
  }

  console.log('sdfsdfs')
}

const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('loginModalActive')
  }
}
</script>
