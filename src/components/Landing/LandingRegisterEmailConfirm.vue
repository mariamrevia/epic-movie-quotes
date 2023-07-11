<template>
  <div
    :ref="modalWrapper"
    :class="[
      'modal-wrapper flex justify-center',
      { 'modal-wrapper--active': isModalActive('confirmModalActive') }
    ]"
    @click="closeModal"
  >
    <div class="h-screen w-screen flex justify-center md:h-0 md:w-0 bg-black">
      <LandingModal
        class="md:w-33.6 w-22 h-23.4 z-10 fixed mt-5 md:mt-7.4 flex flex-col items-center justify-center bg-gray rounded-lg"
        :modalActive="isModalActive('confirmModalActive')"
      >
        <iconDone />
        <h2 class="text-white text-2 mt-1.5">{{ $t('register.email_confirm.thank_you') }}</h2>
        <p class="mt-4 text-white">{{ $t('register.email_confirm.note') }}</p>
        <button class="bg-red w-56 md:w-22 h-2.3 border-none rounded-md text-white mt-1.5">
          {{ $t('register.email_confirm.go_news_feed') }}
        </button>
      </LandingModal>
    </div>
  </div>
</template>

<script setup>
import LandingModal from '@/components/ui/LandingModal.vue'
import iconDone from '@/components/icons/IconDone.vue'
import { onMounted } from 'vue'
import { useModalStore } from '@/stores/modal'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const modalWrapper = ref(null)
const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive
const route = useRoute()

onMounted(async () => {
  console.log(route.query)

  const { verify } = route.query

  if (verify === 'true') {
    modalStore.openModal('confirmModalActive')
  }
})

const closeModal = (event) => {
  if (event.target === modalWrapper.value) {
    modalStore.closeModal('confirmModalActive')
  }
}
</script>
