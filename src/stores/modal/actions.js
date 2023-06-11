
export default {
    openModal(modalName) {
      for (const modal in this.$state) {
        if (modal !== modalName) {
          this.$state[modal] = false
        }
      }
      this.$state[modalName] = true
    },
    closeModal(modalName) {
      this.$state[modalName] = false
    }
  }