<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/authUser'
import { useNotificationStore } from '@/stores/notification'
import { getNotifications } from '@/services/api/quotes.js'
import instantiatePusher from '@/helpers/instantiatePusher'

const userStore = useUserStore()
const notificationStore = useNotificationStore()

onMounted(async () => {
  try {
    await userStore.fetchUser()
    const response = await getNotifications(userStore.user)
    notificationStore.setNotification(response.data.data)
    console.log(notificationStore.notifications)
  } catch (error) {
    console.log(error)
  }
  instantiatePusher()

  console.log(userStore.user)
  window.Echo.private(`likes.${userStore.user}`).listen('Notification', (data) => {
    console.log(data)
    notificationStore.notifications.unshift(data.notification)
    notificationStore.notificationCount++
  })
})
</script>
