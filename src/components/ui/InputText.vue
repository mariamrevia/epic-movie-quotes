<template>
    <div class="flex flex-col">
      <label class="text-caramel mb-0.5 mt-0.5">{{ label }}</label>
      <Field
        class="w-22 h-2.3 rounded-md bg-light-gray"
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :type="type"
        :name="name"
      />
    </div>
    <ErrorMessage class="text-red-700" :name="name" />
  </template>
  
  <script>
  import { Field, ErrorMessage } from 'vee-validate'
  export default {
    components: {
      Field,
      ErrorMessage
    },
    props: {
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
      }
    },

  }
  </script>
  