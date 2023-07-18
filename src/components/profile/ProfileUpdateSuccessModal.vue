<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive(props.name) }]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive(props.name)">
      <div class="bg-[#BADBCC] w-22 h-3.6 mt-5 rounded-md items-center flex flex-row">
        <IconValidGreen class="flex ml-1.25 mr-1.25" />
        <p>{{ props.text }}</p>
        <IconCross @click="closeModal(props.name)" class="h-2 w-2 ml-2 fill-black" />
      </div>
    </LandingModal>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal/index.js'
import LandingModal from '@/components/ui/LandingModal.vue'
import IconValidGreen from '@/components/icons/IconValidGreen.vue'
import IconCross from '@/components/icons/IconCross.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: ''
  },
  text: {
    type: String,
    required: true,
    default: ''
  }
})

const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive

const closeModal = (modalName) => {
  modalStore.closeModal(modalName)
}
</script>
