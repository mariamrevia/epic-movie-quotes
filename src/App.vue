<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/authUser'
import instantiatePusher from '@/helpers/instantiatePusher'

const userStore = useUserStore()

onMounted(async () => {
  instantiatePusher()
  await userStore.fetchUser()
  console.log(userStore.user)
  window.Echo.private(`likes.${userStore.user}`).listen('Notification', (data) => {
    console.log(data)
  })
})
</script>
