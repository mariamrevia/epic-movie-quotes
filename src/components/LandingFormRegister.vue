<template>
    <div :class="['modal-wrapper', { 'modal-wrapper--active': isModalActive('registerModalActive') }]"
        @click="closeModal">
        <LandingModal class="flex flex-col items-center" :modalActive="isModalActive('registerModalActive')">
            <Form class="w-37.5 h-44 z-10 fixed flex flex-col items-center bg-gray rounded-lg mt-7.4">
                <div class="flex flex-col items-center">
                    <h1 class="text-white text-2 mt-3.3">Create and Account</h1>
                    <p class="text-dark-gray">Start your journey!</p>
                    <InputText
                     name="username" 
                     label="Name*" 
                     v-model="register.username"
                      />
                    <InputText 
                    name="email" 
                    v-model="register.email" 
                    label="Email*" 
                    />
                    <InputText 
                    v-model="register.password" 
                    name="password" 
                    label="Password*"
                    type="password"
                    />
                    <InputText 
                    v-model="register.confirm_password" 
                    name="password_confirmation"
                    label="Confirm Password*" 
                    type="password" 
                    />
                    <button type="submit" class="w-22 mt-1.5 h-2.3 bg-red border-none rounded-md text-white">
                        Get started
                    </button>
                    <button type="submit" class="w-22 mt-1.5 h-2.3 border rounded-md text-white">
                        Sign Up with Google
                    </button>
                    <div class="flex flex-row">
                        <p class="mt-2 text-dark-gray">Already have an accoun?</p>
                        <button type="button" @click="logIn" class="text-white flex items-end ml- 0.5">
                            Log In
                        </button>
                    </div>
                </div>
            </Form>
        </LandingModal>
    </div>

</template>

<script setup>
    import { Form } from 'vee-validate'
    import { useModalStore } from '@/stores/modal/index.js'
    import { useRegisterStore } from '@/stores/register'
    import InputText from '@/components/ui/InputText.vue'
    import LandingModal from '@/components/ui/LandingModal.vue'

    const register = useRegisterStore()
    const Modal = useModalStore()
    const isModalActive = Modal.isModalActive
    const logIn = () => {
        Modal.openModal('loginModalActive')
    }
    const closeModal = (event) => {
        if (event.target.classList.contains('modal-wrapper')) {
            Modal.closeModal('registerModalActive')
        }
    }
</script>
