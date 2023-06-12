import axios from "axios"


let defaultInstance = axios.create({
    baseURL:'http://localhost:8000/api'
})
defaultInstance.defaults.withCredentials = true;
export default defaultInstance;