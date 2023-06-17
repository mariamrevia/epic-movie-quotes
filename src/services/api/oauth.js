export async function authGoogle() {
  location.href = import.meta.env.VITE_API_BASE_URL + '/api/auth/redirect'
}
