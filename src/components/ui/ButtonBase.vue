<template>
  <button
    class="bg-red w-56 h-2.3 border-none rounded-md text-white mt-1.5 text-1.25"
    :type="props.type"
  >
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: ''
  },
  text: {
    type: String,
    required: true,
    default: ''
  }
})
</script>
