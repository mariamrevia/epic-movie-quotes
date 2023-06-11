<template>
    <div class="flex flex-col">
      <label class="text-caramel mb-0.5 mt-0.5">{{ label }}</label>
      <Field
        class="w-22 h-2.3 rounded-md bg-light-gray"
        v-bind="$attrs"
        :value="props.value"
        @input="$emit('input', $event.target.value)"
        :type="props.type"
        :name="props.name"
        :rules="props.rules"
      />
    </div>
    <ErrorMessage class="text-red-700" :name="name" />
  </template>
  
  <script setup>
  import { Field, ErrorMessage } from 'vee-validate'
  
  const props =  defineProps({
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
   })
 
   
  </script>
  