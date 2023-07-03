<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('AddMovieModalActive') }]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive('AddMovieModalActive')">
      <Form
        @submit="submitData(movieStore.createMovieData)"
        class="w-60 z-10 fixed flex flex-col md:mt-13.6 pb-13 md:pb-4 items-center bg-darkgray rounded-lg"
      >
        <HeaderEditAdd heading="Add Movie" />
        <InputMovie
          name="name[en]"
          v-model="movieStore.createMovieData.name.en"
          placeholder="Movie name"
          rules="required"
          lang="Eng"
        />
        <InputMovie
          name="name[ka]"
          v-model="movieStore.createMovieData.name.ka"
          placeholder="ფილმის სახელი"
          rules="required"
          lang="Geo"
        />

        <Field
          class="w-56 h-2.3 rounded-md border-0.1 placeholder-white text-white bg-transparent border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
          name="genre"
          rules="required"
          v-model="movieStore.createMovieData.genre"
        >
          <div
            class="w-56 h-2.3 mt-1.25 rounded-md items-center border-0.1 gap-2 placeholder-white text-white bg-transparent relative border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none flex flex-row"
            @click="toggleDropdown"
          >
            <div
              v-for="title in movieStore.genreTitle"
              :key="title"
              class="text-white justify-between h-1.5 p-2 border ml-1 rounded-sm flex items-center bg-[#6C757D] border-none gap-2"
            >
              {{ title }}
              <IconCross @click.stop="deleteGenre(title)" />
            </div>

            <div
              class="w-56 bg-lightBlack text-white absolute z-50 top-2.5 rounded-b-lg p-3 pr-2"
              v-if="isDropdownOpen"
            >
              <div
                class="p-1"
                v-for="genre in movieStore.genreData"
                :value="genre.id"
                :key="genre.id"
                @click="selectedGenre(genre, genre.title)"
              >
                {{ genre.title }}
              </div>
            </div>
            {{ select() }}
          </div>
          <ErrorMessage class="text-red-700" name="genre" />
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
          lang="Eng"
        />
        <InputMovie
          name="director[ka]"
          v-model="movieStore.createMovieData.director.ka"
          placeholder="რეჟისორი"
          rules="required"
          lang="Geo"
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

        <div
          class="w-56 h-5 mt-0.5 rounded-md border-0.1 flex items-center placeholder-white text-white bg-transparent border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
        >
          <label
            for="file-upload"
            class="h-2.6 ml-2 text-center flex p-3 rounded-sm items-center bg-[#9747FF]"
          >
            choose file
          </label>
          <Field
            id="file-upload"
            name="image"
            v-model="movieStore.createMovieData.image"
            type="file"
            :rules="movieStore.createMovieData.image ? '' : 'required'"
          />
          <ErrorMessage class="text-red-700" name="image" />
        </div>
        <ButtonBase type="submit" text="Add Movie" />
      </Form>
    </LandingModal>
  </div>
</template>

<script setup>
import TextAreaBase from '@/components/ui/TextAreaBase.vue'
import LandingModal from '@/components/ui/LandingModal.vue'
import IconCross from '@/components/icons/IconCross.vue'
import InputMovie from '@/components/ui/InputMovie.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import HeaderEditAdd from '@/components/shared/HeaderEditAdd.vue'
import { useModalStore } from '@/stores/modal'
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { Form } from 'vee-validate'
import { storeMovies } from '@/services/api/movies'

const modalStore = useModalStore()
const movieStore = useMovieStore()
const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const selectedGenre = (genre, title) => {
  movieStore.createMovieData.genre.push(genre.id)
  movieStore.genreTitle.push(title)
  console.log(movieStore.genreTitle)
}
const deleteGenre = (title) => {
  const index = movieStore.genreTitle.indexOf(title)
  if (index > -1) {
    movieStore.genreTitle.splice(index, 1)
    movieStore.createMovieData.genre.splice(index, 1)
  }
}
const select = () => {
  if (movieStore.genreTitle.length > 0) {
    return ''
  } else {
    return 'select the genres'
  }
}
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
