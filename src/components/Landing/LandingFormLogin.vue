<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('loginModalActive') }]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive('loginModalActive')">
      <Form
        @submit="handleSubmit"
        class="w-37.5 z-10 fixed flex flex-col md:mt-13.6 pb-13 md:pb-4 items-center bg-darkgray md:bg-gray rounded-lg"
      >
        <div class="flex flex-col items-center">
          <h1 class="text-white text-2 mt-3.3">{{ $t('login.title') }}</h1>
          <p class="text-dark-gray">{{ $t('login.welcome') }}</p>
          <InputText
            name="username"
            :label="$t('login.name')"
            v-model="loginStore.username"
            rules="required"
            :placeholder="$t('placeholders.email')"
          />
          <InputText
            v-model="loginStore.password"
            name="password"
            :label="$t('login.password')"
            type="password"
            rules="required"
            :placeholder="$t('placeholders.enter_password')"
          />

          <div class="flex flex-row justify-between text-white w-full mt-4">
            <div>
              <p>{{ $t('login.remmeber_me') }}</p>
            </div>
            <div>
              <button class="text-blue underline" type="button" @click="resetPassword">
                {{ $t('login.forgot_password') }}
              </button>
            </div>
          </div>

          <LandingModalButton type="submit" :text="$t('login.sign_in')" />
          <button
            @click="loginWithGoogle"
            type="button"
            class="w-22 mt-1.5 h-2.3 border rounded-md text-white"
          >
            {{ $t('login.sign_in_google') }}
          </button>
          <div class="flex flex-row mb-5">
            <p class="mt-2 text-dark-gray">{{ $t('login.have_account') }}</p>
            <button type="button" @click="signUp" class="text-blue underline flex items-end ml-0.5">
              {{ $t('login.Sign_up') }}
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
import { authGoogle } from '@/services/api/oauth'
import { login } from '@/services/api/auth.js'
import { useRouter } from 'vue-router'
import LandingModal from '@/components/ui/LandingModal.vue'
import LandingModalButton from '@/components/ui/LandingModalButton.vue'
import InputText from '@/components/ui/InputText.vue'
import csrf from '@/services/api/csrf.js'

const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive
const router = useRouter()

const signUp = () => {
  modalStore.openModal('registerModalActive')
}

const resetPassword = () => {
  modalStore.openModal('passwordModalActive')
}

const loginStore = useLoginStore()
const handleSubmit = async (values) => {
  try {
    await csrf.getCookie()
    const response = await login(values.username, values.password)
    if (response.status === 200) {
      router.push({ name: 'newsFeed' })
      console.log(response)
    }
  } catch (error) {
    console.log(error)
  }
}
const loginWithGoogle = async () => {
  try {
    await csrf.getCookie()
    await authGoogle()
  } catch (error) {
    console.log(error)
  }
}

const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('loginModalActive')
  }
}
</script>
