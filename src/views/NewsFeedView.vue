<template>
  <dashboardLayout>
    <div class="flex flex-row w-88 items-center">
      <div
        class="w-48 h-3.25 bg-#24222F mt-2 rounded-lg text-white flex flex-row gap-2 items-center"
      >
        <iconPencil class="ml-2" @click="toggleAddQuoteModal" />
        write new quote
      </div>
    </div>
    <div
      class="bg-darkgray pb-7 flex flex-col w-60 pt-4 rounded-2xl mt-2"
      v-for="quote in quoteStore.quote"
      :key="quote.id"
    >
      <div class="m-auto">
        <div class="flex flex-row items-center gap-2">
          <img class="h-4 w-4 rounded-full bg-slate-500" />
          <h2 class="text-white">{{ quote.movie.user }}</h2>
        </div>
        <div class="flex flex-row mt-2">
          <p class="text-white">{{ quote.body.en }}</p>
          <div class="flex flex-row ml-2">
            <h2 class="text-white">Movie -</h2>
            <p class="text-caramel ml-1">{{ quote.movie.name.en }}</p>
            <span class="text-white ml-1">({{ quote.movie.year }})</span>
          </div>
        </div>
        <div class="m-auto mt-2">
          <img class="w-56 h-31 rounded-lg" :src="getImageURL(quote.image)" />
        </div>
        <div class="flex flex-row gap-3 mt-2">
          <div class="flex flex-row items-center gap-2">
            <h2 class="text-white text-1.5">
              {{ quote.comments.length }}
            </h2>
            <IconComments />
          </div>
          <div class="flex flex-row items-center gap-2">
            <p class="text-white text-1.5">{{ quote.likes_count }}</p>
            <div @click="toggleLike(quote.id)">
              <IconLike :isLiked="quote.isLiked" />
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
            <img class="h-3.25 w-3.25 rounded-full bg-slate-500" />
            <div class="ml-2 flex flex-col align-middle justify-center">
              <h2 class="text-white">{{ comment.user }}</h2>
              <p class="text-white">{{ comment.body }}</p>
            </div>
            <hr class="flex h-0.05 bg-slate-700 border-none mt-1.25" />
          </div>
        </div>
        <div
          class="mt-1.5 flex flex-row items-center"
          v-for="comment in comments"
          :key="comment.index"
        >
          <div class="ml-2 flex flex-col align-middle justify-center">
            <h2 class="text-white">{{ comment.username }}</h2>
            <p class="text-white">{{ comment.body }}</p>
          </div>
        </div>
        <div class="flex flex-row items-center mt-3.3">
          <img class="h-3.25 w-3.25 rounded-full bg-slate-500" />
          <Form class="ml-2" @submit="submitData(quote.id)">
            <div
              class="flex relative ml-2 h-3 flex-row items-center bg-#24222F w-50 rounded-md border-none bg-transparen focus-within:ring focus:shadow-shadow outline-none"
            >
              <Field
                class="h-2.3 placeholder-white text-white bg-transparent w-50 ml-1.5 border-none outline-none"
                v-model="quote.commentData.body"
                name="body"
                @keydown.enter.prevent="submitData(quote.id)"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  </dashboardLayout>
  <quoteCreate />
</template>

<script setup>
import dashboardLayout from '@/components/DashboardLayout.vue'
import iconPencil from '@/components/icons/IconPencil.vue'
import quoteCreate from '@/components/quotes/QuoteCreate.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconComments from '@/components/icons/IconComments.vue'
import { Form, Field } from 'vee-validate'
import { useQuoteStore } from '@/stores/quotes/index.js'
import { useModalStore } from '@/stores/modal/index.js'
import { useUserStore } from '@/stores/authUser/index.js'
import { getQuotes, storeComments, storeLikes } from '@/services/api/quotes'
import { onMounted, ref } from 'vue'
const modalStore = useModalStore()
const quoteStore = useQuoteStore()
const userStore = useUserStore()
const comments = ref([])

const toggleAddQuoteModal = () => {
  modalStore.openModal('addQuoteModalActive')
}

onMounted(async () => {
  try {
    const response = await getQuotes()
    quoteStore.quote = response.data.map((quote) => ({
      ...quote,
      commentData: {
        body: '',
        quote_id: quote.id
      },
      isLiked: false,
      likes: 0
    }))
    console.log(quoteStore.quote)
  } catch (error) {
    console.log(error)
  }
})

const toggleLike = async (quoteId) => {
  const quote = quoteStore.quote.find((quote) => quote.id === quoteId)
  if (quote) {
    quote.isLiked = !quote.isLiked
    if (quote.isLiked) {
      quote.likes_count++
    } else {
      quote.likes_count--
    }
    try {
      await storeLikes({ quote_id: quoteId, is_liked: quote.isLiked })
    } catch (error) {
      console.log(error)
    }
  }
}
const submitData = async (id) => {
  const quote_id = id
  const quote = quoteStore.quote.find((quote) => quote.id === id)
  quote.comments.push({
    body: quote.commentData.body,
    user: userStore.username
  })

  try {
    await storeComments({
      body: quote.commentData.body,
      quote_id: quote_id
    })
  } catch (error) {
    console.log(error)
  }
}

const getImageURL = (image) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
}
</script>
