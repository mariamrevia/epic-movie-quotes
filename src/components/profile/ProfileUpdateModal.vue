<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive(props.name) }]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive(props.name)">
      <div
        class="w-full z-10 fixed h-53 mt-6 flex flex-col pb-13 items-center bg-darkgray rounded-lg"
      >
        <div class="flex justify-items-start mb-1.25 w-full">
          <IconGoBack class="h-2 w-2 ml-1" @click="closeModal(props.name)" />
        </div>
        <slot v-if="!confirm"></slot>
        <div v-if="!confirm" class="flex flex-row w-full justify-between gap-3 mt-3.3">
          <p @click="closeModal(props.name)" class="text-white text-1.5 ml-1.25">
            {{ $t('profile.cancell_button') }}
          </p>
          <button
            @click="openConfirm"
            class="bg-red flex w-6.8 h-2.3 items-center justify-center border-none rounded-md mr-1.25 text-white"
          >
            {{ $t('profile.edit_button') }}
          </button>
        </div>
        <div
          v-if="confirm"
          class="w-22 bg-[#24222F] h-14 flex flex-col items-center text-whiteGray"
        >
          <h2 class="text-whiteGray text-1.25 mt-4.4">{{ $t('profile.make_changes') }}</h2>
          <hr class="w-full h-0 bg-whiteGray mt-2" />
          <div class="flex flex-row w-full justify-between mt-2">
            <p @click="closeConfirm" class="text-white text-1.5 ml-1.25">
              {{ $t('profile.cancell_button') }}
            </p>
            <button
              type="submit"
              @click="confirmForm"
              class="bg-red flex w-6.8 h-2.3 items-center justify-center border-none rounded-md mr-1.25 text-white"
            >
              {{ $t('profile.confirm_button') }}
            </button>
          </div>
        </div>
      </div>
    </LandingModal>
  </div>
</template>

<script setup>
import LandingModal from '@/components/ui/LandingModal.vue'
import IconGoBack from '@/components/icons/IconGoBack.vue'
import { useModalStore } from '@/stores/modal/index.js'
import { useUserInfoStore } from '@/stores/updateUserInfo/index.js'
import { defineEmits } from 'vue'
import { ref } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const userInfoStore = useUserInfoStore()
const modalStore = useModalStore()
const confirm = ref(false)
const isModalActive = modalStore.isModalActive

const emits = defineEmits(['confirm'])
const confirmForm = () => {
  console.log(userInfoStore.userData.username)
  emits('confirm')
}
const closeModal = (modalName) => {
  modalStore.closeModal(modalName)
}
const openConfirm = () => {
  confirm.value = true
}
const closeConfirm = () => {
  confirm.value = false
}
</script>
