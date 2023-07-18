<template>
  <div
    :class="[
      'modal-wrapper flex justify-center',
      { 'modal-wrapper--active': isModalActive('passwordResetModalActive') }
    ]"
    @click="closeModal"
  >
    <div class="h-screen w-screen flex justify-center md:h-0 md:w-0 bg-lightBlack">
      <LandingModal
        class="md:w-33.6 w-full pb-10 pt-10 z-10 mt-5 md:mt-13.6 fixed flex flex-col items-center justify-center bg-gradient md:bg-gray rounded-lg"
        :modalActive="isModalActive('passwordResetModalActive')"
      >
        <Form class="flex justify-center flex-col" @submit="handleSubmit">
          <h2 class="text-white text-2 flex justify-center">{{ $t('passwordReset.title') }}</h2>
          <InputText
            v-model="resetPasswordDataStore.password"
            name="password"
            class="w-22"
            :label="$t('passwordReset.password')"
            type="password"
            rules="required|minLength:8|maxLength:15|lowercase"
            :placeholder="$t('placeholders.password')"
          />
          <InputText
            v-model="resetPasswordDataStore.password_confirmation"
            name="password_confirmation"
            class="w-22"
            :label="$t('passwordReset.confirm_password')"
            type="password"
            rules="required|confirmed:password"
            :placeholder="$t('placeholders.enter_password')"
          />

          <p class="mt-4 text-white">{{ $t('passwordReset.note_activation') }}</p>
          <LandingModalButton :text="$t('passwordReset.reset_password')" type="submit" />
        </Form>
      </LandingModal>
    </div>
  </div>
</template>

<script setup>
import { usePasswordResetStore } from '@/stores/passwordReset'
import { useModalStore } from '@/stores/modal'
import { resetPassword } from '@/services/api/auth.js'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Form } from 'vee-validate'
import InputText from '@/components/ui/InputText.vue'
import LandingModal from '@/components/ui/LandingModal.vue'
import LandingModalButton from '@/components/ui/LandingModalButton.vue'
import csrf from '@/services/api/csrf.js'

const modalStore = useModalStore()
const resetPasswordDataStore = usePasswordResetStore()
const route = useRoute()
const isModalActive = modalStore.isModalActive

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
      modalStore.openModal('passwordResetSuccessActive')
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('passwordResetModalActive')
  }
}
</script>
