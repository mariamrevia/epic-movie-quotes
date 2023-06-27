<template>
  <button class="bg-red w-56 h-2.3 border-none rounded-md text-white mt-1.5" :type="props.type">
    submit
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: ''
  }
})
</script>
