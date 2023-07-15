<template>
  <div class="bg-lightBlack min-h-screen w-screen">
    <div class="relative">
      <HeaderDashboard />
    </div>
    <div>
      <TheDashboard class="lg:flex hidden mt-4.4" />
    </div>
    <div class="flex flex-row h-full w-full justify-center">
      <div class="md:ml-17 ml-0">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderDashboard from '@/components/shared/HeaderDashboard.vue'
import TheDashboard from './shared/TheDashboard.vue'
</script>
