import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/authUser'

import LandingView from '@/views/LandingView.vue'
import NewsFeedView from '@/views/NewsFeedView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/newsFeed', name: 'newsFeed', component: NewsFeedView, meta: { requiresAuth: true } }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const authUserStore = useUserStore()
    await authUserStore.fetchUser()
    console.log(authUserStore)
    if (to.meta.requiresAuth && (!authUserStore.isAuthenticated || authUserStore.verified)) {
      next({ name: 'landing' })
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
    next(false)
  }
})

export default router
