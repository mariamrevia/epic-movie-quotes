import { defineStore } from 'pinia'
import actions from '@/stores/modal/actions'
import getters from '@/stores/modal/getters'

export const useModalStore = defineStore('modal', {
  state: () => ({
    registerModalActive: false,
    confirmModalActive: false,
    loginModalActive: false,
    emailSentModalActive: false,
    passwordModalActive: false,
    passwordResetModalActive: false,
    passwordResetSuccessActive: false,
    passwordEmailSentModalActive: false,
    AddMovieModalActive: false,
    editMovieModalActive: false,
    addQuoteModalActive: false,
    editQuoteModalActive: false,
    viewQuoteModalActive: false,
    createQuoteModalActive: false,
    usernameUpdateModalActive: false,
    emailUpdateModalActive: false,
    passwordUpdateModalActive: false,
    profileUpdateSuccess: false,
    profileEmailUpdate: false
  }),

  getters: getters,
  actions: actions
})
