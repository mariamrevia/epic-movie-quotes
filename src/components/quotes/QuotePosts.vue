<template>
  <div
    class="bg-darkgray pb-7 flex flex-col lg:w-60 md:w-43 w-22 pt-4 rounded-2xl mt-2"
    v-for="quote in quoteStore.quotes"
    :key="quote.id"
  >
    <div class="m-auto lg:w-56 md:w-43 w-22 items-center">
      <div class="flex flex-row items-center gap-2">
        <img :src="getImage(quote.movie.image)" class="h-4 w-4 rounded-full bg-slate-500" />
        <h2 class="text-white">{{ quote.movie.user }}</h2>
      </div>
      <div class="flex flex-row mt-2">
        <p class="text-white">{{ quote.body.en }}</p>
        <div class="flex flex-row ml-2">
          <h2 class="text-white">Movie -</h2>

          <p class="text-caramel ml-1">
            {{ $i18n.locale === 'en' ? quote.movie.name.en : quote.movie.name.ka }}
          </p>
          <span class="text-white ml-1">({{ quote.movie.year }})</span>
        </div>
      </div>
      <div class="m-auto mt-2 flex justify-center">
        <img class="lg:w-56 md:w-43 md:h-31 w-22 h-15 rounded-lg" :src="getImageURL(quote.image)" />
      </div>
      <div class="flex flex-row gap-3 mt-2">
        <div class="flex flex-row items-center gap-2">
          <h2 class="text-white text-1.5">
            {{ quote.comments.length }}
          </h2>
          <IconComments />
        </div>
        <div class="flex flex-row items-center gap-2">
          <p class="text-white text-1.5">{{ quote.likes.length }}</p>
          <div @click="toggleLike(quote.id, quote.movie_id)">
            <IconLike :class="getQuoteColor(quote.id)" />
          </div>
        </div>
      </div>
      <hr class="flex h-0.05 bg-slate-700 border-none mt-1.25" />

      <div
        class="mt-1.5 flex flex-col"
        v-for="comment in quote && quote.comments"
        :key="comment.id"
      >
        <div class="mt-1.5 flex flex-row items-center">
          <img
            :src="getImage(comment.user.image)"
            class="h-3.25 w-3.25 rounded-full bg-slate-500"
          />
          <div class="ml-2 flex flex-col align-middle justify-center">
            <h2 class="text-white">{{ comment.user.username }}</h2>
            <p class="text-white">{{ comment.body }}</p>
          </div>
          <hr class="flex h-0.05 bg-slate-700 border-none mt-1.25" />
        </div>
      </div>

      <div class="flex flex-row items-center mt-3.3">
        <img class="h-3 w-3 rounded-full bg-slate-500" />
        <Form class="md:ml-2 ml-1" @submit="submitData(quote.id)">
          <div
            class="flex relative h-3 flex-row items-center bg-#24222F lg:w-50 md:w-30 w-17.5 rounded-md border-none bg-transparen focus-within:ring focus:shadow-shadow outline-none"
          >
            <Field
              class="h-2.3 placeholder-white text-white bg-transparent lg:w-50 md:w-30 w-17.5 md:ml-1.5 ml-0 border-none outline-none"
              v-model="quote.commentData.body"
              name="body"
              @keydown.enter.prevent="submitData(quote.id, quote.movie_id)"
            />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconLike from '@/components/icons/IconLike.vue'
import IconComments from '@/components/icons/IconComments.vue'
import { Form, Field } from 'vee-validate'
import {
  getQuotes,
  storeComments,
  storeLikes,
  destroyLikes,
  likeNotification,
  commentNotification
} from '@/services/api/quotes'
import { onMounted, ref, onUnmounted } from 'vue'
import { useQuoteStore } from '@/stores/quotes/index.js'
import { useUserStore } from '@/stores/authUser/index.js'
import instantiatePusher from '@/helpers/instantiatePusher'

const userStore = useUserStore()
const quoteStore = useQuoteStore()
const currentPage = ref(1)
const hasMoreQuotes = ref(true)

const fetchQuotes = async () => {
  try {
    const response = await getQuotes(currentPage.value)
    const newQuotes = response.data.data
    if (newQuotes.length === 0) {
      hasMoreQuotes.value = false
    } else {
      const updatedQuotes = newQuotes.map((quote) => ({
        ...quote,
        commentData: {
          body: '',
          quote_id: quote.id
        }
      }))

      const uniqueQuotes = updatedQuotes.filter((quote) => {
        return !quoteStore.quotes.some((existingQuote) => existingQuote.id === quote.id)
      })

      quoteStore.updateQuotes([...quoteStore.quotes, ...uniqueQuotes])
      currentPage.value++
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    await fetchQuotes()
    console.log(quoteStore.quotes)
  } catch (error) {
    console.log(error)
  }
})

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const documentHeight = document.documentElement.offsetHeight

  if (scrollPosition + window.innerHeight >= documentHeight && hasMoreQuotes.value) {
    fetchQuotes()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

let userLikes = {}
onMounted(async () => {
  const response = await getQuotes()
  quoteStore.updateQuotes(response.data.data)

  quoteStore.quotes.forEach((quote) => {
    quote.commentData = {
      body: '',
      quote_id: quote.id
    }
    const foundLike = quote.likes.find((like) => like.user_id === userStore.user)
    userLikes[quote.id] = !!foundLike
  })
})

const getQuoteColor = (quoteId) => {
  return userLikes[quoteId] ? 'fill-[#F3426C]' : 'fill-white'
}
const toggleLike = async (quoteId, movieId) => {
  const isLiked = userLikes[quoteId]

  if (isLiked) {
    userLikes[quoteId] = false
    await destroyLikes({ quote_id: quoteId })
  } else {
    userLikes[quoteId] = true
    await storeLikes(quoteId)
    await likeNotification(movieId)
  }
}

const quote_id = ref(null)
const submitData = async (id, movieId) => {
  quote_id.value = id
  const quote = quoteStore.quotes.find((quote) => quote.id === id)
  try {
    await storeComments({
      body: quote.commentData.body,
      quote_id: quote_id.value
    })
    await commentNotification(movieId)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  instantiatePusher()
  window.Echo.channel('commentQuote').listen('CommentPosted', (comment) => {
    const quote = quoteStore.quotes.find((quote) => quote.id === comment.comment.quote_id)
    quote.comments.push({
      body: comment.comment.body,
      user: userStore.username
    })
  })
  window.Echo.channel('likeQuotes').listen('LikeQuote', (like) => {
    const quote = quoteStore.quotes.find((quote) => quote.id === like.like.quote_id)
    quote.likes.push({ id: like.like.id })
  })

  window.Echo.channel('unlike').listen('UnLikeQuote', (like) => {
    const quote = quoteStore.quotes.find((quote) => quote.id === like.like.quote_id)
    quote.likes.pop({ id: like.like.id })
  })
})
onUnmounted(() => {
  window.Echo.leaveChannel('commentQuote')
  window.Echo.leaveChannel('likeQuotes')
})
const getImage = (image) => {
  if (image.startsWith('images')) {
    return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
  } else {
    return image
  }
}
// const userImage = (image) => {
//   if (image.startsWith('images')) {
//     return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
//   } else {
//     return image
//   }

// }

const getImageURL = (image) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
}
// const imageUrl = ref(`${import.meta.env.VITE_API_BASE_URL}/storage/${}`)
</script>
