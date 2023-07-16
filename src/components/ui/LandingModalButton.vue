<template>
  <button :type="type" class="bg-red w-22 h-2.3 border-none rounded-md text-white mt-1.5">
    {{ props.text }}
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  },
  type: {
    type: String,
    required: true
  }
})
</script>
