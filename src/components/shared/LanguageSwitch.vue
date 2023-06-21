<template>
  <select
    v-model="$i18n.locale"
    class="mr-4 bg-transparent text-white fles pr-1 items-center outline-none"
  >
    <option
      class="bg-[#221f32] bg-transparent outline-none border-none rounded-md"
      v-for="Locale in $i18n.availableLocales"
      :key="`locale-${Locale}`"
      :value="Locale"
    >
      {{ Locale }}
    </option>
  </select>
</template>
