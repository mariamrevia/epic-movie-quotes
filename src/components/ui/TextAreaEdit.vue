<template>
  <Field v-slot="{ field }" :name="props.name" :rules="rules" :value="modelValue">
    <div
      class="flex relative mt-1.5 flex-row border-dark-gray md:w-56 sm:w-37.5 w-20 first:rounded-md border-0.1 bg-transparen focus-within:ring focus:shadow-shadow outline-none"
    >
      <span class="ml-[1%] mt-0.5 text-dark-gray">
        {{ props.text }}
      </span>
      <textarea
        v-bind="field"
        :name="props.name"
        :placeholder="placeholder"
        @input="updateText($event.target.value)"
        class="h-5 mt-0.5 placeholder-white text-white bg-transparent md:w-56 sm:w-37.5 w-20 ml-1.5 border-dark-gray outline-none"
      ></textarea>
      <span class="absolute z-999 md:ml-95 ml-90 text-dark-gray">{{ props.lang }}</span>
    </div>
  </Field>
  <ErrorMessage class="text-red-700" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  value: {
    type: String,
    required: false,
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
  text: {
    type: String,
    required: true,
    default: ''
  },
  lang: {
    type: String,
    required: false,
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
  emits('update:modelValue', newValue)
}
</script>
