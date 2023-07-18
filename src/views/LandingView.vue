<template>
  <div class="md:min-h-screen w-screen bg-landingPage flex flex-col">
    <TheHeader />
    <div
      class="bg-landingPage h-53 border-none min-w-full flex flex-col items-center justify-center"
    >
      <LandingRegister />
      <LandingLogin />
      <LandingRegisterEmailSent />
      <LandingRegisterEmailConfirm />
      <LandingPasswordVerifyEmail />
      <LandingPasswordReset />
      <LandingPasswordResetSuccess />
      <LandingPasswordEmailSent />

      <div>
        <h1 class="text-caramel md:text-4 md:w-50 w-22 text-2 text-center">
          {{ $t('landing.title') }}
        </h1>
      </div>
      <button
        @click="goToLogIn"
        class="bg-red w-8.3 h-3 border-none rounded-md text-white mt-[1.5rem]"
      >
        {{ $t('landing.get_started') }}
      </button>
    </div>

    <div
      class="md:min-h-screen items-center h-31 w-screen sm:min-w-full flex bg-landingPage1 bg-no-repeat md:bg-cover bg-[length:700px_600px] bg-center"
    >
      <div class="pl-2 md:pl-52">
        <h2 class="text-white text-1.25 md:text-3 w-17.5 md:w-45">
          “{{ $t('landing.first_quote') }}”
        </h2>
        <p class="text-white text-1">{{ $t('landing.first_movie') }}, 2014</p>
      </div>
    </div>
    <div
      class="md:min-h-screen h-31 items-center w-screen sm:min-w-full flex bg-landingPage2 md:bg-fixed bg-no-repeat bg-[length:900px_600px] md:bg-cover bg-50% bg-center"
    >
      <div class="pl-2 md:pl-52">
        <h2 class="text-white text-1.25 md:text-3 w-15.6 md:w-45">
          “{{ $t('landing.second_quote') }},”
        </h2>
        <p class="text-white text-1">{{ $t('landing.second_movie') }},2001</p>
      </div>
    </div>
    <div
      class="md:min-h-screen items-center h-31 w-screen sm:min-w-full flex bg-landingPage3 md:bg-fixed bg-no-repeat bg-[length:800px_600px] bg-right md:bg-cover md:bg-center"
    >
      <div class="pl-2 md:pl-52">
        <h2 class="text-white text-1.25 md:text-3 w-17.5 md:w-45">
          “{{ $t('landing.third_quote') }}....”
        </h2>
        <p class="text-white text-1">{{ $t('landing.third_movie') }}, 2003</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useModalStore } from '@/stores/modal'
import LandingRegister from '@/components/Landing/LandingRegister.vue'
import LandingPasswordResetSuccess from '@/components/Landing/LandingPasswordResetSuccess.vue'
import LandingLogin from '@/components/Landing/LandingLogin.vue'
import LandingRegisterEmailSent from '@/components/Landing/LandingRegisterEmailSent.vue'
import LandingRegisterEmailConfirm from '@/components/Landing/LandingRegisterEmailConfirm.vue'
import LandingPasswordVerifyEmail from '@/components/Landing/LandingPasswordVerifyEmail.vue'
import LandingPasswordReset from '@/components/Landing/LandingPasswordReset.vue'
import LandingPasswordEmailSent from '@/components/Landing/LandingPasswordEmailSent.vue'
import TheHeader from '@/components/shared/TheHeader.vue'

const modalStore = useModalStore()
const goToLogIn = () => {
  modalStore.openModal('loginModalActive')
}
</script>
