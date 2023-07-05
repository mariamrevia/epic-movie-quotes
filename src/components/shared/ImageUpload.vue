<template>
  <div
    class="w-56 h-5 mt-0.5 rounded-md border-0.1 flex items-center placeholder-white text-white bg-transparent border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    @dragover="onDragOver"
  >
    <div class="flex flex-row items-center ml-1.25">
      <IconPhoto />
      <span class="flex flex-row ml-1.25" v-if="!isDragging">
        {{ imageUploaded ? 'File uploaded' : 'Drag and drop image here or' }}
        <Field
          class="hidden"
          @input="uploadFile($event.target.value)"
          id="file-upload"
          :name="props.name"
          type="file"
          @change="fileSelected"
          :rules="rules"
        />

        <label
          for="file-upload"
          class="h-2.6 ml-3 absolute left-18 bottom-6.25 text-center flex p-3 rounded-sm items-center bg-[#9747FF]"
        >
          Choose file
        </label>
      </span>
    </div>
    <ErrorMessage class="text-red-700 ml-40" name="image" />
  </div>
</template>

<script setup>
import IconPhoto from '@/components/icons/IconPhoto.vue'

import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: ''
  },
  rules: {
    tupe: Boolean,
    required: true,
    default: ''
  }
})
const isDragging = ref(false)
const onDragOver = (event) => {
  event.preventDefault()
  isDragging.value = true
  event.dataTransfer.dropEffect = 'copy'
}

const onDragLeave = (event) => {
  event.preventDefault()
  isDragging.value = false
}

const imageUploaded = ref(false)
const onDrop = (event) => {
  event.preventDefault()
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  uploadFile(file)
  imageUploaded.value = true
}
const emits = defineEmits(['update:imageUpload'])
const uploadFile = (file) => {
  emits('update:imageUpload', file)
}

const fileSelected = (event) => {
  const file = event.target.files[0]
  emits('update:imageUpload', file)
  imageUploaded.value = true
}
</script>
