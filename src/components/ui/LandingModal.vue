<template>
  <transition name="modal-animation">
    <div v-show="props.modalActive">
      <transition name="modal-animation-inner">
        <div v-show="props.modalActive" class="flex flex-col items-center">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  modalActive: {
    require: true,
    type: Boolean
  }
})
</script>
