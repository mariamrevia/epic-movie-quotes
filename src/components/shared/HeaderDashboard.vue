<template>
  <div
    :class="
      searchModal
        ? 'hidden'
        : 'w-screen flex fixed flex-row items-center bg-darkPurple h-5 justify-between '
    "
  >
    <h2 class="text-caramel md:ml-4.4 hidden items-center ml-4 md:flex">
      {{ $t('landing.movie_quotes') }}
    </h2>
    <button @click="toggleListDiv" class="md:hidden flex pl-1">
      <IconList />
    </button>
    <div class="md:mr-4.4 mr-4 flex flex-row items-center">
      <IconSearch
        v-if="isNewsfeedPage"
        @click="openSearchModal"
        class="md:hidden h-1.3 w-1.3 mr-1.25"
      />

      <div class="relative flex items-center">
        <IconBell @click="toggle" class="mr-1.25 h-1.5 w-1.5" />
        <div
          v-if="notificationStore.notificationCount !== 0"
          class="bg-lightRed flex justify-center absolute right-[12.5%] top-[1%] h-1.5 w-1.5 rounded-full text-white"
        >
          {{ notificationStore.notificationCount }}
        </div>
      </div>

      <IconNotification v-if="open" class="h2 w-2 absolute top-3.1" />
      <div
        v-if="open"
        class="no-scrollbar z-10 flex overflow-y-auto h-41 flex-col md:w-58 w-25 absolute md:right-[5%] right-0 top-[90%] rounded-lg bg-black gap-2 z-999 p-8"
      >
        <div class="flex flex-row justify-between">
          <h2 class="text-white text-1.5">{{ $t('dashboard.notifications') }}</h2>
          <h2 class="text-white underline" @click="markRead">{{ $t('dashboard.all_read') }}</h2>
        </div>
        <div
          v-for="(notification, index) in notificationStore.notifications"
          :key="notification.index"
        >
          <div
            class="flex flex-row text-white md:w-54 md:22 h-7.3 items-center gap-2 border-0.1 border-gray rounded-md"
          >
            <div class="flex flex-row gap-2">
              <div class="flex flex-col items-center">
                <img
                  :class="
                    notification.is_read === 0 || notification.is_read === null
                      ? ' border-0.1 border-lime-600 rounded-full h-3.6 w-3.6 ml-1.25'
                      : 'rounded-full h-3.6 w-3.6 ml-1.25'
                  "
                  :src="imageUrl(notification.image)"
                />
                <p
                  v-if="notification.is_read === 0 || notification.is_read === null"
                  class="text-green-600 md:hidden flex ml-1 mt-1"
                >
                  {{ $t('dashboard.new') }}
                </p>
              </div>
              <div
                class="flex md:flex-row flex-col ml-2 md:ml-0 items-start md:justify-between md:w-50 w-15"
              >
                <div class="flex flex-col md:text-start gap-2">
                  <h2>{{ notification.username }}</h2>
                  <p class="flex flex-row gap-1" v-if="notification.action_type === 'like'">
                    <IconHeartFill />
                    {{ $t('dashboard.reacted_like') }}
                  </p>
                  <p class="flex flex-row gap-1" v-else>
                    <IconChat />
                    {{ $t('dashboard.commented_quote') }}
                  </p>
                </div>
                <div class="mr-1.25 text-1.25 flex flex-col items-end">
                  <p class="text-1">{{ timeDifferences[index] }}</p>
                  <p
                    v-if="notification.is_read === 0 || notification.is_read === null"
                    class="text-green-600 hidden md:flex"
                  >
                    {{ $t('dashboard.new') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitch class="md:flex" />
      <button
        class="md:w-6 md:p-0 p-2 md:flex items-center justify-center h-2.3 border rounded-md text-white"
        @click="handlelogOut"
      >
        {{ $t('dashboard.log_out') }}
      </button>
    </div>
  </div>
  <TheDashboard
    v-if="listDivVisible"
    class="ml-0 bg-[#12101A] flex top-0 z-30"
    @click="closeListDivVisible"
  />
  <div
    class="h-45 bg-[#12101A] w-25 items-start z-auto fixed md:hidden flex flex-col"
    v-show="searchModal"
  >
    <div class="flex flex-row mt-2 items-end">
      <IconGoBack class="ml-1.25" @click="closeSearchModal" />
      <TheSearch class="ml-3.3" />
    </div>
    <hr class="max-h-0 mt-1.5 bg-whiteGray w-full" />
    <div class="text-whiteGray mt-3.3 ml-6 gap-2 flex flex-col">
      <p>{{ $t('dashboard.search_with_movie', { hash: '#' }) }}</p>
      <p>{{ $t('dashboard.search_with_quote', { at: '@' }) }}</p>
    </div>
  </div>
</template>

<script setup>
import { logOut } from '@/services/api/auth.js'
import { markAsRead } from '@/services/api/quotes.js'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification/index.js'
import { onMounted, ref, computed } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { useUserStore } from '@/stores/authUser/index.js'
import { useRoute } from 'vue-router'
import TheDashboard from '@/components/shared/TheDashboard.vue'
import IconList from '@/components/icons/IconList.vue'
import TheSearch from '@/components/TheSearch.vue'
import LanguageSwitch from '@/components/shared/LanguageSwitch.vue'
import IconBell from '@/components/icons/IconBell.vue'
import IconHeartFill from '@/components/icons/IconHeartFill.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconGoBack from '@/components/icons/IconGoBack.vue'
import IconNotification from '@/components/icons/IconNotification.vue'

const notificationStore = useNotificationStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const searchModal = ref(false)
const listDivVisible = ref(false)
const timeDifferences = ref([])
const open = ref(false)

onMounted(() => {
  notificationStore.notificationCount = notificationStore.notifications.reduce(
    (count, notification) => {
      return notification.is_read === 1 ? count : count + 1
    },
    0
  )

  notificationStore.notifications.forEach((notification) => {
    const notificationTimestamp = new Date(notification.created_at)
    const currentTime = new Date()
    const timeDifference = formatDistanceToNow(notificationTimestamp, {
      addSuffix: true,
      currentDate: currentTime
    })
    timeDifferences.value.push(timeDifference)
  })
})

const isNewsfeedPage = computed(() => {
  return route.name === 'newsFeed'
})
const openSearchModal = () => {
  searchModal.value = !searchModal.value
}
const closeSearchModal = () => {
  searchModal.value = false
}
const toggle = () => {
  open.value = !open.value
}

const toggleListDiv = () => {
  listDivVisible.value = !listDivVisible.value
}
const closeListDivVisible = () => {
  listDivVisible.value = false
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
