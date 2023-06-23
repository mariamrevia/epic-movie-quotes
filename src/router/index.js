import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/authUser'

import LandingView from '@/views/LandingView.vue'
import ListOfMoviesView from '@/views/ListOfMoviesView.vue'
import NewsFeedView from '@/views/NewsFeedView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    {
      path: '/newsFeed',
      name: 'newsFeed',
      component: NewsFeedView,
      meta: { requiresAuth: true }
    },
    {
      path: '/listofmovies',
      name: 'list-of-movies',
      component: ListOfMoviesView,
      meta: { requiresAuth: true }
    }
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
  }
})

export default router
