<template>
  <Field v-slot="{ field }" :name="props.name" :rules="rules" :value="modelValue">
    <textarea
      v-bind="field"
      :name="props.name"
      :placeholder="placeholder"
      @input="updateText($event.target.value)"
      class="w-56 h-5 mt-0.5 rounded-md border-0.1 placeholder-white text-white bg-transparent border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
    ></textarea>
  </Field>
  <ErrorMessage class="text-red-700" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  value: {
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
  modelValue: {
    type: String,
    required: true,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])
const updateText = (newValue) => {
  console.log(newValue)
  emits('update:modelValue', newValue)
}
</script>
