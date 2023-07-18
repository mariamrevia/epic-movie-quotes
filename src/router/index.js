import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/authUser/index.js'
import { verifyEmail, verifyNewEmail } from '@/services/api/auth.js'
import { useNotificationStore } from '@/stores/notification/index.js'
import ProfileView from '@/views/ProfileView.vue'
import LandingView from '@/views/LandingView.vue'
import ListOfMoviesView from '@/views/ListOfMoviesView.vue'
import NewsFeedView from '@/views/NewsFeedView.vue'
import MovieView from '@/views/MovieView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

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
      meta: { requiresAuth: true },
      component: ListOfMoviesView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/email/verify/:id/:hash',
      name: 'updateprofile',
      component: ProfileView,

      beforeEnter: async (to) => {
        const { expires, new_email, signature } = to.query
        const { id, hash } = to.params
        console.log(to.params)

        await verifyNewEmail(id, hash, expires, new_email, signature)
        const authUserStore = useUserStore()
        await authUserStore.fetchUser()
      }
    },
    {
      path: '/email/verify/:id/:hash',
      name: 'verify',
      component: LandingView,

      beforeEnter: async (to) => {
        const { expires, signature } = to.query
        const { id, hash } = to.params

        await verifyEmail(id, hash, expires, signature)
      }
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MovieView,
      meta: { requiresAuth: true }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not-Found',
      component: NotFoundView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const notificationStore = useNotificationStore()
    const authUserStore = useUserStore()
    await authUserStore.fetchUser()
    await notificationStore.fetchNotifications(authUserStore.user)
    if (to.meta.requiresAuth && (!authUserStore.isAuthenticated || authUserStore.verified)) {
      next({ name: 'forbidden' })
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

export default router
