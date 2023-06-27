<template>
  <div class="flex flex-col">
    <label class="text-caramel mb-0.5 mt-0.5">{{ label }}</label>
    <div
      class="flex relative h-3 flex-row items-center border-[#6C757D] w-56 rounded-md border-0.1 bg-transparen focus-within:ring focus:shadow-shadow outline-none"
    >
      <span class="ml-[1%] text-[#6C757D]">{{ text }}</span>
      <Field
        v-bind="$attrs"
        :value="props.value"
        :placeholder="placeholder"
        class="h-2.3 placeholder-white text-white bg-transparent w-45 ml-1.5 border-[#6C757D] outline-none"
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
    required: false,
    default: ''
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  text: {
    type: String,
    required: false,
    default: ''
  }
})

const emits = defineEmits(['input'])
const updateText = (newValue) => {
  console.log(newValue)
  emits('input', newValue)
}
</script>
