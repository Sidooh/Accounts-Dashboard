import {createApp} from 'vue'

//modules
import {createPinia} from "pinia"
import axios from "axios"

//component
import App from './App.vue'
import router from "./routes"
import {useAuthStore} from "./stores/auth"

const pinia = createPinia()

//initialize
const app = createApp(App)
    .use(router)
    .use(pinia)


// TODO: Refactor to client ...
axios.interceptors.response.use(
    ({data}) => {
        if (data && data.result === 0) {
            return Promise.reject(data)
        }
        return data
    },
    async ({response}) => {
        if (response?.status === 401) {
            const authStore = useAuthStore()

            await authStore.logout()

            await router.push({name: 'login'})
        }

        return Promise.reject(response)
    }
)
axios.defaults.baseURL = import.meta.env.VITE_ACCOUNTS_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = "Bearer " + useAuthStore().getToken();


app.mount('#app')