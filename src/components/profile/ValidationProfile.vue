<template>
  <div class="w-33 pt-3 py-3 border-0.1 border-dark-gray rounded-lg">
    <h2 class="text-white ml-1.25 mb-1">{{ name }} should contain:</h2>
    <div
      v-for="(item, index) in props.items"
      :key="index"
      class="flex flex-row items-center gap-2 ml-1.25"
    >
      <div
        :class="
          props.valid ? 'bg-green-500 rounded-full w-1 h-1' : 'bg-[#9C9A9A] rounded-full w-1 h-1'
        "
      ></div>
      <p :class="props.valid ? 'text-white' : 'text-[#9C9A9A]'">{{ item }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  valid: {
    type: Boolean,
    required: false
  },
  items: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
</script>
