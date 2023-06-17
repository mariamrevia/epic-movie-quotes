<template>
  <select v-model="$i18n.locale" class="mr-4 bg-transparent text-white">
    <option v-for="Locale in $i18n.availableLocales" :key="`locale-${Locale}`" :value="Locale">
      {{ Locale }}
    </option>
  </select>
</template>
