<template>
  <select
    v-model="$i18n.locale"
    @change="sendLocaleToBackend"
    class="mr-4 bg-transparent text-white fles pr-1 items-center outline-none"
  >
    <option
      class="bg-darkPurple bg-transparent outline-none border-none rounded-md"
      v-for="Locale in $i18n.availableLocales"
      :key="`locale-${Locale}`"
      :value="Locale"
    >
      {{ Locale }}
    </option>
  </select>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

import { sendLocale } from '@/services/api/language.js'
const sendLocaleToBackend = async () => {
  try {
    await sendLocale(locale.value)
  } catch (error) {
    console.error(error)
  }
}
</script>
