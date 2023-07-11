<template>
  <dashboardLayout>
    <h2 class="text-white md:flex hidden text-1.5 ml-13.6 md:mt-1.5 mt-0">My Profile</h2>
    <div>
      <Form
        v-slot="{ meta }"
        @submit="submitData"
        class="relative md:mt-3.3 mt-0 lg:ml-9 md:ml-3 ml-0 flex flex-col items-center"
      >
        <div class="absolute z-999 flex w-22 flex-col items-center top-5">
          <img
            :src="userStore.google_id ? userStore.image : imageUrl"
            class="h-12 w-12 bg-slate-500 rounded-full"
          />
          <input id="file-upload" class="hidden" name="image" type="file" @change="onFileChange" />
          <label v-if="!userStore.google_id" for="file-upload" class="text-white text-1.25"
            >Upload new photo</label
          >
        </div>
        <div class="md:mt-9 mt-9 flex flex-col items-center">
          <div
            class="md:w-62 w-22 md:pb-10 pb-6 md:bg-darkgray bg-[#24222F] rounded-lg m-auto md:m-0 flex items-center justify-center"
          >
            <div class="w-30 md:mt-9 mt-13.6 pt-4 flex flex-col gap-4">
              <div class="flex flex-row items-end md:justify-normal justify-center">
                <InputText
                  class="md:w-30 sm:22 bg-transparent border-none placeholder-slate-700"
                  name="disabledUsername"
                  :placeholder="userStore.username"
                  label="username"
                  disabled
                />
                <p class="text-white text-1.25 ml-2" @click="openEdit('username')">Edit</p>
              </div>

              <ValidationProfile
                v-if="isEdit && name === 'username'"
                name="username"
                :valid="meta.valid"
                :items="[
                  'Minimum 3 characters',
                  'Maximum 15 characters',
                  'Only lowercase characters'
                ]"
              />
              <InputText
                v-if="isEdit && name === 'username'"
                v-model="userInfoStore.userData.username"
                class="w-30 placeholder-slate-700"
                name="username"
                rules="minLength:3|maxLength:15|lowercase"
                label="username"
              />
              <p class="text-white md:flex sm:hidden">{{ console.log(meta) }}</p>

              <div class="flex flex-row items-end md:justify-normal justify-center">
                <InputText
                  class="md:w-30 sm:22 bg-transparent border-none placeholder-slate-700"
                  name="disabledEmail"
                  label="Email"
                  :placeholder="userStore.email"
                  disabled
                />
                <p
                  v-if="!userStore.google_id"
                  class="text-white text-1.25 ml-2"
                  @click="openEdit('email')"
                >
                  Edit
                </p>
              </div>
              <ValidationProfile
                v-if="isEdit && name === 'email'"
                :valid="meta.valid"
                name="email"
                :items="['Must be tyoe of an Email']"
              />
              <InputText
                v-if="isEdit && name === 'email'"
                class="w-30 placeholder-slate-700"
                v-model="userInfoStore.userData.email"
                name="email"
                label="Email"
                rules="email"
              />
              <div
                :class="
                  userStore.google_id
                    ? 'hidden'
                    : 'flex flex-row items-end md:justify-normal justify-center '
                "
              >
                <InputText
                  class="md:w-30 sm:22 bg-transparent border-none placeholder-slate-700"
                  name="disabledPassword"
                  label="Password"
                  disabled
                />
                <p class="text-white text-1.25 ml-2" @click="openEdit('password')">Edit</p>
              </div>
              <ValidationProfile
                v-if="isEdit && name === 'password'"
                name="password"
                :valid="meta.valid"
                :items="['Password must match']"
              />
              <InputText
                v-if="isEdit && name === 'password'"
                class="w-30 placeholder-slate-700"
                v-model="userInfoStore.userData.password"
                name="password"
                type="password"
                label="new password"
                rules="required"
              />
              <InputText
                v-if="isEdit && name === 'password'"
                class="w-30 placeholder-slate-700"
                type="password"
                v-model="userInfoStore.userData.password_confirmation"
                name="password_confirmation"
                label="confirm new password"
                rules="required|confirmed:password"
              />
            </div>
          </div>
        </div>
        <div class="md:flex flex-row w-full hidden justify-end items-center gap-3 mt-3.3">
          <p @click="cancell" class="text-white text-1.5">Cancell</p>
          <button class="bg-red w-9.7 h-2.3 border-none rounded-md self-end text-white">
            Save Changes
          </button>
        </div>
      </Form>
    </div>
  </dashboardLayout>
</template>

<script setup>
import dashboardLayout from '@/components/DashboardLayout.vue'
import InputText from '@/components/ui/InputText.vue'
import ValidationProfile from '@/components/ValidationProfile.vue'
import { useUserStore } from '@/stores/authUser/index.js'
import { updateUsersInfo } from '@/services/api/profileUpdate.js'
import { useUserInfoStore } from '@/stores/updateUserInfo/index.js'
import { getUser } from '@/services/api/auth.js'
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'

const isEdit = ref(false)
const name = ref('')
const userInfoStore = useUserInfoStore()

const openEdit = (inputName) => {
  if (inputName === 'username') {
    isEdit.value = true
    name.value = 'username'
  } else if (inputName === 'email') {
    isEdit.value = true
    name.value = 'email'
  } else if (inputName === 'password') {
    isEdit.value = true
    name.value = 'password'
  }
}

const cancell = () => {
  isEdit.value = !isEdit.value
}
const userStore = useUserStore()
onMounted(async () => {
  console.log(userStore.google_id)
  try {
    const response = await getUser()
    const data = response.data
    userInfoStore.setUser(data)

    console.log(userInfoStore.user)
  } catch (error) {
    console.error(error)
  }
})

const image = ref(null)

const submitData = async () => {
  await updateUsersInfo({
    user: userInfoStore.user.id,
    username: userInfoStore.userData.username,
    email: userInfoStore.userData.email,
    password: userInfoStore.userData.password,
    password_confirmation: userInfoStore.userData.password_confirmation,
    image: image.value
  })

  await userStore.fetchUser()
}
const imageUrl = ref(`${import.meta.env.VITE_API_BASE_URL}/storage/${userStore.image}`)
const onFileChange = (event) => {
  const file = event.target.files[0]
  image.value = file

  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  }
}
</script>