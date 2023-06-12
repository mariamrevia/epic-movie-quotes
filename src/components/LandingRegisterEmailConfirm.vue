<template>
    <div :ref="modalWrapper" :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('confirmModalActive') }]"
        @click="closeModal">
        <LandingModal class="w-33 h-23.4 z-10 fixed flex flex-col items-center justify-center bg-gray rounded-lg"
            :modalActive="isModalActive('confirmModalActive')">
            <h2 class="text-white text-2">Thank You!</h2>
            <p class="mt-4 text-white">Your account has been activated.</p>
            <button class="bg-red w- 22 h-2.3 border-none rounded-md text-white mt-1.5">
                Go to my news feed
            </button>
        </LandingModal>
    </div>
</template>

<script setup>
    import LandingModal from  '@/components/ui/LandingModal.vue'
    import { onMounted } from 'vue'
    import { useModalStore } from '@/stores/modal'
    import { useRoute } from 'vue-router'
    import { ref } from 'vue';

const modalWrapper = ref(null);
    const Modal = useModalStore()
    const isModalActive = Modal.isModalActive
    const route = useRoute();
    onMounted(() => {
      const confirmed = route.query.confirmed
      console.log(confirmed)
      if (confirmed === 'true') {
        Modal.openModal('confirmModalActive');
      }
    });


    const closeModal = (event) => {
        if (event.target === modalWrapper.value) {
    Modal.closeModal('confirmModalActive');
  }
    }
</script>
