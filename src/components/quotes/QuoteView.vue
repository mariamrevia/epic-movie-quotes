<template>
  <div
    :class="[
      'modal-wrapper overflow-y-auto',
      { 'modal-wrapper--active': isModalActive('viewQuoteModalActive') }
    ]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive('viewQuoteModalActive')">
      <div
        class="md:w-60 w-full z-10 fixed flex flex-col md:mt-5 pb-13 md:pb-4 items-center bg-darkgray rounded-lg"
      >
        <HeaderEditAdd modalName="viewQuoteModalActive" :heading="$t('quote.view_quote')" />
        <div
          class="md:w-60 w-22 h-54 flex gap-2 overflow-y-auto flex-col items-center"
          v-for="quote in getFilteredQuotes"
          :key="quote.id"
        >
          <InputText
            :placeholder="quote.body.en"
            class="md:w-56 w-22 h-4 border-gray-600 md:bg-transparent bg-transparent placeholder-whiteGray"
            lang="Eng"
            rules="required"
            disabled
          />
          <InputText
            class="md:w-56 w-22 h-4 border-gray-600 md:bg-transparent bg-transparent placeholder-whiteGray"
            :placeholder="quote.body.ka"
            lang="Geo"
            rules="required"
            disabled
          />
          <img class="md:w-56 md:h-32 w-20 h-19 mt-1.25" :src="imageUrl(quote.image)" />
          <div class="flex flex-row gap-3 mt-2 md:w-56 w-20">
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
          <div
            class="mt-1.5 flex flex-col md:w-56 w-20"
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
            <img
              :src="userStore.google_id ? userStore.image : imageUrl"
              class="h-3 w-3 rounded-full bg-slate-500"
            />
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
    </LandingModal>
  </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import * as Api from '@/services/api/quotes.js'
import { useQuoteStore } from '@/stores/quotes/index.js'
import { useModalStore } from '@/stores/modal'
import { onMounted, onUnmounted, computed } from 'vue'
import { useUserStore } from '@/stores/authUser/index.js'
import LandingModal from '@/components/ui/LandingModal.vue'
import HeaderEditAdd from '@/components/shared/HeaderEditAdd.vue'
import InputText from '@/components/ui/InputText.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconComments from '@/components/icons/IconComments.vue'

const props = defineProps({
  quoteToEdit: {
    type: Object,
    required: true
  }
})
const modalStore = useModalStore()
const quoteStore = useQuoteStore()
const userStore = useUserStore()
const isModalActive = modalStore.isModalActive
const getFilteredQuotes = computed(() => {
  if (props.quoteToEdit && quoteStore.quotes) {
    return quoteStore.quotes.filter((quote) => quote.id === props.quoteToEdit)
  }
  return []
})

onMounted(async () => {
  try {
    const response = await Api.getQuotes()
    quoteStore.updateQuotes(response.data.data)

    quoteStore.quotes.forEach((quote) => {
      quote.commentData = {
        body: '',
        quote_id: quote.id
      }
    })
  } catch (error) {
    console.log(error)
  }
})

let userLikes = {}
onMounted(async () => {
  const response = await Api.getQuotes()
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
const toggleLike = async (quoteId) => {
  const isLiked = userLikes[quoteId]
  if (isLiked) {
    userLikes[quoteId] = false
    await Api.destroyLikes({ quote_id: quoteId })
    const quote = quoteStore.quotes.find((quote) => quote.id === quoteId)

    if (quote) {
      quote.likes.pop({ id: quoteId })
    }
  } else {
    userLikes[quoteId] = true
    const response = await Api.storeLikes(quoteId)
    const quote = quoteStore.quotes.find((quote) => quote.id === response.data.data.quote_id)
    const like = response.data.data
    if (quote) {
      quote.likes.push({ id: like.id })
    }
  }
}
const submitData = async (id) => {
  const quote = quoteStore.quotes.find((quote) => quote.id === id)
  try {
    await Api.storeComments({
      body: quote.commentData.body,
      quote_id: id
    })
  } catch (error) {
    console.log(error)
  }
  const response = await Api.getQuotes()
  quoteStore.updateQuotes(response.data.data)

  quoteStore.quotes.forEach((quote) => {
    quote.commentData = {
      body: '',
      quote_id: quote.id
    }
  })
}
const imageUrl = (image) => {
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
}
const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('viewQuoteModalActive')
  }
}

const getImage = (image) => {
  if (image.startsWith('images')) {
    return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
  } else {
    return image
  }
}
onUnmounted(() => {
  window.Echo.leaveChannel('commentQuote')
  window.Echo.leaveChannel('likeQuotes')
})
</script>
