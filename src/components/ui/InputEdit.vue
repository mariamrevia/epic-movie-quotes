<template>
  <div class="flex flex-col">
    <label class="text-caramel mb-0.5 mt-0.5">{{ label }}</label>
    <div
      class="flex relative h-3 flex-row items-center border-dark-gray md:w-56 sm:w-37.5 w-20 rounded-md border-0.1 bg-transparen focus-within:ring focus:shadow-shadow outline-none"
    >
      <span class="ml-[1%] text-dark-gray">{{ text }}</span>
      <Field
        v-bind="$attrs"
        :value="props.value"
        :placeholder="placeholder"
        class="h-2.3 placeholder-white px-6 text-white bg-transparent md:w-56 sm:33.6 w-20 ml-1.5 border-dark-gray outline-none"
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
  emits('input', newValue)
}
</script>
