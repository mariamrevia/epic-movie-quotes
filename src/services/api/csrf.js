import axios from '@/plugins/axios/axios.js'


export default {
    getCookie() {
        return axios.get("/csrf-cookie")
    }
}