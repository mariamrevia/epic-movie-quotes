<template>
  <button
    class="bg-red xl:w-56 lg:w-37.5 w-20 h-2.3 border-none rounded-md text-white mt-1.5 text-1.25"
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
