import {createApp} from 'vue'

//modules
import {createPinia} from "pinia"
import axios from "axios"

//component
import App from './App.vue'
import router from "./routes"
import {useAuthStore} from "./stores/auth"
import {useRouter} from "vue-router";

const pinia = createPinia()
//initialize
const app = createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

axios.defaults.baseURL = import.meta.env.VITE_ACCOUNTS_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(
    response => {
        if (response.data && response.data.success === false) {
            return Promise.reject(response.data)
        }
        return response
    },
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                const authStore = useAuthStore()

                authStore.token = null
                authStore.user = {}

                router.push({name: 'login'})

                return Promise.reject(error)
            }
        }
    }
)
