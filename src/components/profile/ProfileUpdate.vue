<template>
  <div class="md:hidden flex flex-col w-22 h-57 bg-#24222F rounded-lg mt-9">
    <Form
      @submit="submitForm"
      class="md:mt-3.3 mt-5 lg:ml-9 md:ml-3 ml-0 flex flex-col items-center"
    >
      <div class="w-22 m-auto flex flex-col items-center justify-center">
        <div class="flex w-22 flex-col items-center top-5">
          <img
            :src="userStore.google_id ? userStore.image : imageUrl"
            class="h-12 w-12 bg-slate-500 rounded-full"
          />
          <input
            id="file-uploaded"
            class="hidden"
            name="image"
            type="file"
            @change="onFileChange"
          />
          <label v-if="!userStore.google_id" for="file-uploaded" class="text-white text-1.25"
            >Upload new photo</label
          >
        </div>
        <div class="flex flex-col items-start">
          <div class="flex flex-col items-end md:justify-normal justify-center mt-1">
            <div class="flex flex-row items-end">
              <InputText
                class="w-14 border-none bg-transparent placeholder-whiteGray"
                name="disabledUsername"
                :placeholder="userStore.username"
                label="username"
                disabled
              />
              <p
                class="text-white text-1.25 ml-2 mb-0.5"
                @click="toggleModal('usernameUpdateModalActive')"
              >
                Edit
              </p>
            </div>
            <hr class="w-full h-0 bg-whiteGray mt-1.25" />
          </div>
          <div class="flex flex-col justify-center mt-1">
            <div class="flex flex-row items-end">
              <InputText
                class="w-14 border-none bg-transparent placeholder-whiteGray"
                name="disabledEmail"
                label="Email"
                :placeholder="userStore.email"
                disabled
              />
              <p
                v-if="!userStore.google_id"
                class="text-white text-1.25 ml-2"
                @click="toggleModal('emailUpdateModalActive')"
              >
                Edit
              </p>
            </div>
          </div>
          <hr class="w-full h-0 bg-whiteGray mt-1.25" />
          <div class="flex flex-col justify-center mt-1">
            <div class="flex flex-row items-end">
              <div
                :class="
                  userStore.google_id
                    ? 'hidden'
                    : 'flex flex-row items-end md:justify-normal justify-center '
                "
              >
                <InputText
                  class="w-14 border-none bg-transparent placeholder-whiteGray"
                  name="disabledPassword"
                  placeholder="***********"
                  label="Password"
                  disabled
                />
                <p
                  class="text-white text-1.25 ml-2"
                  @click="toggleModal('passwordUpdateModalActive')"
                >
                  Edit
                </p>
              </div>
            </div>
            <hr class="w-full h-0 bg-whiteGray mt-1.25" />
          </div>
        </div>
      </div>

      <ProfileUpdateModal @confirm="submitForm" name="usernameUpdateModalActive">
        <div class="bg-[#24222F] h-14 w-full flex flex-col items-center justify-center">
          <InputText
            v-model="userInfoStore.userData.username"
            class="w-20 placeholder-slate-700 bg-whiteGray"
            name="username"
            rules="minLength:3|maxLength:15|lowercase"
            label="Enter new username"
          />
        </div>
      </ProfileUpdateModal>
      <ProfileUpdateModal @confirm="submitForm" name="emailUpdateModalActive">
        <div class="bg-[#24222F] h-14 w-full flex flex-col items-center justify-center">
          <InputText
            class="w-20 placeholder-slate-700 bg-whiteGray"
            v-model="userInfoStore.userData.email"
            name="email"
            label="Enter new Email"
            rules="email"
          />
        </div>
      </ProfileUpdateModal>
      <ProfileUpdateModal @confirm="submitForm" name="passwordUpdateModalActive">
        <div class="bg-[#24222F] h-14 w-full flex flex-col items-center justify-center">
          <InputText
            class="w-20 placeholder-slate-700 bg-whiteGray"
            v-model="userInfoStore.userData.password"
            name="password"
            type="password"
            label="Enter new password"
            rules="required"
          />
          <InputText
            class="w-20 placeholder-slate-700 bg-whiteGray"
            type="password"
            v-model="userInfoStore.userData.password_confirmation"
            name="password_confirmation"
            label="confirm new password"
            rules="required|confirmed:password"
          />
        </div>
      </ProfileUpdateModal>
    </Form>
  </div>
  <ProfileUpdateSuccessModal name="profileUpdateSuccess" text="Profile Updated successfully" />
  <ProfileUpdateSuccessModal name="profileEmailUpdate" text="Check email for verification" />
</template>

<script setup>
import { useUserStore } from '@/stores/authUser/index.js'
import { updateUsersInfo } from '@/services/api/profileUpdate.js'
import { useModalStore } from '@/stores/modal/index.js'
import { useUserInfoStore } from '@/stores/updateUserInfo/index.js'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import ProfileUpdateSuccessModal from '@/components/profile/ProfileUpdateSuccessModal.vue'
import ProfileUpdateModal from '@/components/profile/ProfileUpdateModal.vue'
import InputText from '@/components/ui/InputText.vue'
const userStore = useUserStore()
const userInfoStore = useUserInfoStore()
const modalStore = useModalStore()
const image = ref(null)

const toggleModal = (modalName) => {
  modalStore.openModal(modalName)
}
const submitForm = async () => {
  try {
    const response = await updateUsersInfo({
      user: userInfoStore.user.id,
      username: userInfoStore.userData.username,
      email: userInfoStore.userData.email,
      password: userInfoStore.userData.password,
      password_confirmation: userInfoStore.userData.password_confirmation,
      image: image.value
    })
    console.log(response.data.message)
    if (response.data.message.includes('UserInfo updated successfully')) {
      modalStore.openModal('profileUpdateSuccess')
    } else if (
      response.data.message.includes('Please check your email to verify the new email address')
    ) {
      modalStore.openModal('profileEmailUpdate')
    }
    await userStore.fetchUser()
  } catch (error) {
    console.log(error)
  }
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
