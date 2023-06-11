export default {
    isModalActive: (state) => (modalName) => {
        return state[modalName]
      }
}