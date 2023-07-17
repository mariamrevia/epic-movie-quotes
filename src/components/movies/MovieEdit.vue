<template>
  <div
    :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('editMovieModalActive') }]"
    @click="closeModal"
  >
    <LandingModal :modalActive="isModalActive('editMovieModalActive')">
      <Form
        @submit="submitData"
        class="md:w-60 w-full z-10 fixed flex flex-col md:mt-5 pb-13 md:pb-4 items-center bg-darkgray rounded-lg"
      >
        <HeaderEditAdd modalName="editMovieModalActive" :heading="$t('movie.edit_movie')" />
        <inputEdit
          name="name[en]"
          rules="required|alphabetEn"
          v-model="editMovie.name.en"
          text="Movie name:"
          lang="Eng"
        />
        <inputEdit
          name="name[ka]"
          rules="required|alphabetKa"
          v-model="editMovie.name.ka"
          text="ფილმის სახელი:"
          lang="Geo"
        />
        <Field
          class="md:w-56 sm:w-37.5 w-20 h-2.3 rounded-md border-0.1 placeholder-white text-white bg-transparent border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
          name="genre"
          rules="required"
          v-model="editMovie.genres"
        >
          <div
            class="md:w-56 sm:w-37.5 w-20 h-2.3 mt-1.25 rounded-md items-center border-0.1 gap-2 placeholder-white text-white bg-transparent relative border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none flex flex-row"
            @click="toggleDropdown"
          >
            <div
              v-for="genre in editMovie.genres"
              :key="genre.index"
              class="text-white justify-between h-1.5 p-2 border ml-1 rounded-sm flex items-center bg-[#6C757D] border-none gap-2"
            >
              {{ genre.title }}
              <iconCross class="fill-white" @click.stop="deleteGenre(genre.id)" />
            </div>

            <div
              class="w-56 bg-lightBlack text-white absolute z-50 top-2.5 rounded-b-lg p-3 pr-2"
              v-if="isDropdownOpen"
            >
              <div
                class="p-1"
                v-for="genre in props.genres"
                :value="genre.id"
                :key="genre.id"
                @click="selectedGenre(genre, genre.title)"
              >
                {{ genre.title }}
              </div>
            </div>
          </div>
          <ErrorMessage class="text-red-700" name="genre" />
        </Field>
        <InputEdit
          name="year"
          v-model="editMovie.year"
          type="number"
          text="წელი:"
          :rules="editMovie.year ? '' : 'required'"
        />
        <InputEdit
          name="director[en]"
          v-model="editMovie.director.en"
          text="director:"
          lang="Eng"
          rules="required|alphabetEn"
        />
        <InputEdit
          name="director[ka]"
          v-model="editMovie.director.ka"
          text="რეჟისორი:"
          lang="Geo"
          rules="required|alphabetKa"
        />
        <TextAreaEdit
          name="description[en]"
          v-model="editMovie.description.en"
          text="description:"
          lang="Eng"
          rules="required"
        />
        <TextAreaEdit
          name="description[ka]"
          v-model="editMovie.description.ka"
          text="აღწერა:"
          lang="Geo"
          rules="required|alphabetKa"
        />
        <div
          class="md:w-56 sm:w-37.5 w-20 mt-0.5 rounded-md border-0.1 flex items-center placeholder-white text-white bg-transparent border-[#6C757D] bg-light-gray focus-within:ring focus:shadow-shadow outline-none"
        >
          <div>
            <img class="w-27 h-9.6" :src="imageUrl" />
          </div>
          <label
            for="image-upload"
            class="h-2.6 ml-2 text-center flex p-3 rounded-sm items-center bg-[#9747FF]"
          >
            choose file
          </label>
          <Field
            id="image-upload"
            name="image"
            v-model="editMovie.image"
            class="hidden"
            type="file"
            @change="onFileChange"
          />
        </div>

        <ButtonBase type="submit" :text="$t('movie.edit_movie')" />
      </Form>
    </LandingModal>
  </div>
</template>

<script setup>
import LandingModal from '@/components/ui/LandingModal.vue'
import InputEdit from '@/components/ui/InputEdit.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import iconCross from '@/components/icons/IconCross.vue'
import HeaderEditAdd from '@/components/shared/HeaderEditAdd.vue'
import { updateMovies } from '@/services/api/movies.js'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useModalStore } from '@/stores/modal'
import { computed, ref } from 'vue'

import TextAreaEdit from '@/components/ui/TextAreaEdit.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: false
  },
  genres: {
    type: Object,
    required: false
  }
})

const selectedGenre = (genre, title) => {
  editMovie.value.genres.push({ id: genre.id, title: title })

  console.log(editMovie.value.genres)
}
const deleteGenre = (id) => {
  const index = editMovie.value.genres.findIndex((genre) => genre.id === id)
  if (index > -1) {
    editMovie.value.genres.splice(index, 1)
  }
}
const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const image = ref(null)
const submitData = async () => {
  try {
    await updateMovies({
      name: {
        en: editMovie.value.name.en,
        ka: editMovie.value.name.ka
      },
      director: {
        en: editMovie.value.director.en,
        ka: editMovie.value.director.ka
      },
      description: {
        en: editMovie.value.description.en,
        ka: editMovie.value.description.ka
      },
      year: editMovie.value.year,
      genres: editMovie.value.genres.map((genre) => genre.id),
      movie: editMovie.value.id,
      image: image.value
    })
    console.log(image.value)
  } catch (error) {
    console.log(error)
  }
}

const editMovie = computed(() => (props.movie ? { ...props.movie } : null))
const modalStore = useModalStore()
const isModalActive = modalStore.isModalActive
const closeModal = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    modalStore.closeModal('editMovieModalActive')
  }
}

const imageUrl = ref(`${import.meta.env.VITE_API_BASE_URL}/storage/${editMovie.value.image}`)
const onFileChange = (event) => {
  const file = event.target.files[0]
  image.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
  console.log('editMovie.image:', editMovie.value.image)
}
</script>
