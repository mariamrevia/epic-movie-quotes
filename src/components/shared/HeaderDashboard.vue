<template>
  <div class="w-screen flex flex-row items-center bg-[#221f32] h-5 justify-between">
    <h2 class="text-caramel md:ml-4.4 hidden items-center ml-4 md:flex">MOVIE QUOTES</h2>
    <div class="md:mr-4.4 mr-4 flex flex-row">
      <LanguageSwitch class="hidden md:flex" />

      <button
        class="md:w-6 hidden md:flex items-center justify-center h-2.3 border rounded-md text-white"
      >
        log out
      </button>
    </div>
  </div>
</template>

<script setup>
import LanguageSwitch from '@/components/shared/LanguageSwitch.vue'
</script>
