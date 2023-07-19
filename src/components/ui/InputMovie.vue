<template>
  <div class="flex flex-col">
    <label class="text-caramel mb-0.5 mt-0.5">{{ label }}</label>
    <div class="flex relative h-3 flex-row items-center">
      <span class="absolute z-999 ml-[1%] text-dark-gray">{{ text }}</span>
      <Field
        v-bind="$attrs"
        :value="props.value"
        class="xl:w-56 lg:w-37.5 px-6 w-20 h-2.3 rounded-md border-0.1 placeholder-white text-white bg-transparent border-dark-gray bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
        @input="updateText($event.target.value)"
        :type="props.type"
        :name="props.name"
        :rules="props.rules"
      />
      <span class="absolute z-999 md:ml-95 ml-90 text-dark-gray">{{ props.lang }}</span>
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
    required: false,
    default: ''
  },
  type: {
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
  lang: {
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
  emits('input', newValue)
}
</script>
