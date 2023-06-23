<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('AddMovieModalActive') }]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive('AddMovieModalActive')">
      <Form
        @submit="submitData(movieStore.createMovieData)"
        class="w-60 z-10 fixed flex flex-col md:mt-13.6 pb-13 md:pb-4 items-center bg-darkgray md:bg-gray rounded-lg"
      >
        <h2 class="text-white text-2 mt-2">Add Movie</h2>
        <InputMovie
          name="name[en]"
          v-model="movieStore.createMovieData.name.en"
          placeholder="Movie name"
          rules="required"
        />
        <InputMovie
          name="name[ka]"
          v-model="movieStore.createMovieData.name.ka"
          placeholder="ფილმის სახელი"
          rules="required"
        />

        <Field name="genre" v-model="movieStore.createMovieData.genre" as="select">
          <option v-for="genres in movieStore.genreData" :key="genres.id" :value="genres.id">
            {{ genres.title }}
          </option>
        </Field>
        <InputMovie
          name="year"
          type="number"
          v-model="movieStore.createMovieData.year"
          placeholder="year"
          rules="required"
        />
        <InputMovie
          name="director[en]"
          v-model="movieStore.createMovieData.director.en"
          placeholder="Director"
          rules="required"
        />
        <InputMovie
          name="director[ka]"
          v-model="movieStore.createMovieData.director.ka"
          placeholder="რეჟისორი"
          rules="required"
        />
        <TextAreaBase
          name="description[en]"
          v-model="movieStore.createMovieData.description.en"
          placeholder="Movie description"
          rules="required"
        />

        <TextAreaBase
          name="description[ka]"
          v-model="movieStore.createMovieData.description.ka"
          placeholder="ფილმის აღწერა"
          rules="required"
        />

        <Field name="image" v-model="movieStore.createMovieData.image" type="file" />

        <button type="submit">submit</button>
      </Form>
    </LandingModal>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'
import { useModalStore } from '@/stores/modal'
import TextAreaBase from '@/components/ui/TextAreaBase.vue'
import LandingModal from '@/components/ui/LandingModal.vue'
import InputMovie from '@/components/ui/InputMovie.vue'
import { useMovieStore } from '@/stores/movies'
import { Form } from 'vee-validate'
import { storeMovies } from '@/services/api/movies'

const modalStore = useModalStore()
const movieStore = useMovieStore()
const isModalActive = modalStore.isModalActive

const submitData = async () => {
  try {
    await storeMovies({
      name: {
        en: movieStore.createMovieData.name.en,
        ka: movieStore.createMovieData.name.ka
      },
      director: {
        en: movieStore.createMovieData.director.en,
        ka: movieStore.createMovieData.director.ka
      },
      description: {
        en: movieStore.createMovieData.description.en,
        ka: movieStore.createMovieData.description.ka
      },
      year: movieStore.createMovieData.year,
      genre: movieStore.createMovieData.genre,
      image: movieStore.createMovieData.image
    })
  } catch (error) {
    console.log(error)
  }
}

const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('AddMovieModalActive')
  }
}
</script>
