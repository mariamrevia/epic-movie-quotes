<template>
  <Field v-slot="{ field }" :name="props.name" :rules="rules" :value="modelValue">
    <div
      class="flex relative md:mt-1.5 mt-1 flex-row border-dark-gray xl:w-56 lg:w-37.5 w-20 rounded-md border-0.1 bg-transparen focus-within:ring focus:shadow-shadow outline-none"
    >
      <textarea
        v-bind="field"
        :name="props.name"
        :placeholder="placeholder"
        @input="updateText($event.target.value)"
        class="h-5 mt-0.5 placeholder-white text-white bg-transparent md:w-45 sm:w-37.5 w-17.5 ml-1.5 border-dark-gray outline-none"
      >
      </textarea>
      <span class="absolute z-999 md:ml-95 ml-90 top-2 text-dark-gray">{{ props.lang }}</span>
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
    required: false,
    default: ''
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
  },
  lang: {
    type: String,
    required: false,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])
const updateText = (newValue) => {
  emits('update:modelValue', newValue)
}
</script>
