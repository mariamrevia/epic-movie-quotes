<template>
  <div class="w-screen flex flex-row items-center bg-[#221f32] h-5 justify-between">
    <h2 class="text-caramel md:ml-4.4 hidden items-center ml-4 md:flex">MOVIE QUOTES</h2>
    <div class="md:mr-4.4 mr-4 flex flex-row">
      <div class="relative">
        <IconBell @click="toggle" class="mr-1.25" />
        <div
          v-if="notificationStore.notificationCount !== 0"
          class="bg-lightRed flex justify-center absolute right-[12.5%] top-[1%] h-1.5 w-1.5 rounded-full text-white"
        >
          {{ notificationStore.notificationCount }}
        </div>
      </div>
      <div
        v-if="open"
        class="no-scrollbar flex overflow-y-auto h-41 flex-col w-58 absolute right-[5%] top-[90%] rounded-lg bg-black gap-2 z-999 p-8"
      >
        <div class="flex flex-row justify-between">
          <h2 class="text-white text-1.5">Notifications</h2>
          <h2 class="text-white underline" @click="markRead">Mark All as read</h2>
        </div>
        <div
          v-for="(notification, index) in notificationStore.notifications"
          :key="notification.index"
        >
          <div
            class="flex flex-row justify-between text-white w-54 h-7.3 items-center gap-2 border-0.1 border-[#6C757D] rounded-md"
          >
            <div class="flex flex-row gap-2">
              <img
                :class="
                  notification.is_read === 0 || notification.is_read === null
                    ? ' border-0.1 border-lime-600 rounded-full h-3.6 w-3.6 ml-1.25'
                    : 'rounded-full h-3.6 w-3.6 ml-1.25'
                "
                :src="imageUrl(notification.image)"
              />
              <div class="flex flex-col gap-2">
                <h2>{{ notification.username }}</h2>
                <p class="flex flex-row gap-1" v-if="notification.action_type === 'like'">
                  <IconHeartFill />
                  Reacted to your quote
                </p>
                <p class="flex flex-row gap-1" v-else>
                  <IconChat />
                  Commented to you movie Quote
                </p>
              </div>
            </div>
            <div class="mr-1.25 text-1.25 flex flex-col items-end">
              <p>{{ timeDifferences[index] }}</p>
              <p
                v-if="notification.is_read === 0 || notification.is_read === null"
                class="text-green-600"
              >
                New
              </p>
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitch class="hidden md:flex" />

      <button
        class="md:w-6 hidden md:flex items-center justify-center h-2.3 border rounded-md text-white"
        @click="handlelogOut"
      >
        log out
      </button>
    </div>
  </div>
</template>

<script setup>
import { logOut } from '@/services/api/auth.js'
import { markAsRead } from '@/services/api/quotes.js'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification/index.js'
import { onMounted, ref } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { useUserStore } from '@/stores/authUser/index.js'
import LanguageSwitch from '@/components/shared/LanguageSwitch.vue'
import IconBell from '@/components/icons/IconBell.vue'
import IconHeartFill from '@/components/icons/IconHeartFill.vue'
import IconChat from '@/components/icons/IconChat.vue'

const router = useRouter()
const notificationStore = useNotificationStore()
const timeDifferences = ref([])
const userStore = useUserStore()
onMounted(() => {
  console.log(notificationStore.notifications)

  notificationStore.notificationCount = notificationStore.notifications.reduce(
    (count, notification) => {
      return notification.is_read === 1 ? count : count + 1
    },
    0
  )
  notificationStore.notifications.forEach((notification) => {
    const notificationTimestamp = new Date(notification.created_at)
    console.log(notificationTimestamp)
    const currentTime = new Date()
    const timeDifference = formatDistanceToNow(notificationTimestamp, {
      addSuffix: true,
      currentDate: currentTime
    })
    timeDifferences.value.push(timeDifference)
  })
  console.log(userStore.image)
})

const open = ref(false)
const toggle = () => {
  open.value = !open.value
}

const markRead = async () => {
  try {
    await markAsRead(userStore.user)
  } catch (error) {
    console.log
  }
  notificationStore.notifications.forEach((notification) => {
    notification.is_read = true
  })
  notificationStore.notificationCount = 0
}
const handlelogOut = async () => {
  await logOut()
  router.push({ name: 'landing' })
}
const imageUrl = (image) => {
  if (image.startsWith('images')) {
    return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
  } else {
    return image
  }
}
</script>
