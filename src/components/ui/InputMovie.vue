<template>
  <div class="flex flex-col">
    <label class="text-caramel mb-0.5 mt-0.5">{{ label }}</label>
    <div class="flex relative h-3 flex-row items-center">
      <Field
        v-bind="$attrs"
        :value="props.value"
        class="w-56 h-2.3 rounded-md border-0.1 placeholder-white text-white bg-transparent border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
        @input="updateText($event.target.value)"
        :type="props.type"
        :name="props.name"
        :rules="props.rules"
      />
      <span class="absolute z-999 ml-[95%] text-[#6C757D]">{{ props.lang }}</span>
    </div>
  </div>
  <ErrorMessage class="text-red-700" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },

  rules: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true,
    default: ''
  },
  lang: {
    type: String,
    required: true,
    default: ''
  }
})

const emits = defineEmits(['input'])
const updateText = (newValue) => {
  console.log(newValue)
  emits('input', newValue)
}
</script>
