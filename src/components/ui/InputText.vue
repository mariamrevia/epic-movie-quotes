<template>
  <div class="flex flex-col">
    <label class="text-white mb-0.5 mt-0.5">{{ label }}</label>
    <div class="flex relative h-3 flex-row items-center">
      <Field
        v-bind="$attrs"
        :value="props.value"
        :class="fieldClasses"
        @input="updateText($event.target.value)"
        :type="props.type"
        :name="props.name"
        :rules="props.rules"
      />
      <iconValid
        v-if="meta.valid && !errorMessage && !meta.initialValue && meta.dirty"
        class="absolute flex right-0.8 z-100"
      />
      <iconInvalid v-if="errorMessage" class="absolute flex right-0.8 z-100" />
    </div>
  </div>

  <ErrorMessage class="text-red-700" :name="name" />
</template>

<script setup>
import iconValid from '@/components/icons/IconValid.vue'
import iconInvalid from '@/components/icons/IconInvalid.vue'
import { Field, ErrorMessage, useField } from 'vee-validate'
import { computed } from 'vue'

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

const { errorMessage, meta } = useField(props.name)

const fieldClasses = computed(() => {
  let classes =
    ' h-2.3 rounded-md border-0.1 md:bg-light-gray  focus-within:ring focus:shadow-shadow outline-none '
  if (meta.touched && errorMessage.value) {
    classes += ' border-red-700'
  }
  if (meta.valid && meta.dirty && !errorMessage.value) {
    classes += ' border-green-700'
  }
  return classes
})

const emits = defineEmits(['input'])
const updateText = (newValue) => {
  console.log(newValue)
  emits('input', newValue)
}
</script>
