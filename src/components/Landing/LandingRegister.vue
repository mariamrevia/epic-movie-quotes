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
        class="md:w-37.5 w-full z-10 fixed flex flex-col pb-13 md:pb-4 items-center bg-darkgray md:bg-gray rounded-lg mt-0 md:mt-7.4"
      >
        <div class="flex flex-col items-center">
          <h1 class="text-white text-2 mt-3.3">{{ $t('register.create_account') }}</h1>
          <p class="text-dark-gray">{{ $t('register.start_journey') }}</p>
          <InputText
            name="username"
            class="w-22"
            :label="$t('register.name')"
            v-model="registerStore.username"
            rules="required|minLength:3|maxLength:15|lowercase"
            :placeholder="$t('placeholders.name')"
          />
          <div v-if="errors.username" class="text-red-500 mt-1">{{ errors.username[0] }}</div>

          <InputText
            name="email"
            class="w-22"
            v-model="registerStore.email"
            :label="$t('register.email')"
            rules="required|email"
            :placeholder="$t('placeholders.email')"
          />
          <div v-if="errors.email" class="text-red-500 mt-1">{{ errors.email[0] }}</div>
          <InputText
            class="w-22"
            v-model="registerStore.password"
            name="password"
            :label="$t('register.password')"
            type="password"
            rules="required|minLength:8|maxLength:15|lowercase"
            :placeholder="$t('placeholders.password')"
          />
          <div v-if="errors.password" class="text-red-500 mt-1">{{ errors.password[0] }}</div>
          <InputText
            class="w-22"
            v-model="registerStore.confirm_password"
            name="password_confirmation"
            :label="$t('register.confirm_password')"
            type="password"
            rules="required|confirmed:password"
            :placeholder="$t('placeholders.confirm_password')"
          />

          <LandingModalButton :text="$t('register.get_started')" type="submit" />
          <button
            type="button"
            @click="registerWithGoogle"
            class="w-22 mt-1.5 h-2.3 flex flex-row items-center justify-center gap-1 border rounded-md text-white"
          >
            <IconGoogle />
            {{ $t('register.sign_up_google') }}
          </button>
          <div class="flex flex-row mb-5">
            <p class="mt-2 text-dark-gray">{{ $t('register.have_account') }}?</p>
            <button type="button" @click="logIn" class="text-blue underline flex items-end ml-0.5">
              {{ $t('register.log_in') }}
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
import { register } from '@/services/api/auth.js'
import { authGoogle } from '@/services/api/oauth'
import { ref } from 'vue'
import InputText from '@/components/ui/InputText.vue'
import LandingModalButton from '@/components/ui/LandingModalButton.vue'
import IconGoogle from '@/components/icons/IconGoogle.vue'
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

const errors = ref({})
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
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      errors.value = error.response.data.errors
    }
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
