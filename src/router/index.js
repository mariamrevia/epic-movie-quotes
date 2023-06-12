import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import NewsFeedView from '@/views/NewsFeedView.vue'
import { useUserStore } from '@/stores/authUser'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/newsFeed', name: 'newsFeed', component: NewsFeedView, meta: { requiresAuth: true } }
  ]
})

router.beforeEach((to, from, next) => {
  const authUser = useUserStore()
  console.log(authUser)
  if (to.meta.requiresAuth && (!authUser.isAuthenticated || !authUser.verified)) {
    next('/')
  } else {
    next()
  }
})
export default router
