import { createApp } from 'vue'

//modules
import { createPinia } from "pinia"
import axios from "axios"

//component
import App from './App.vue'
import router from "./routes"
import { useAuthStore } from "./stores/auth"

import 'bootstrap/dist/js/bootstrap.min.js'

const pinia = createPinia()

axios.interceptors.response.use(
    response => {
        if (response.data && response.data.errors) {
            return Promise.reject(response.data)
        }
        return response
    },
    async error => {
        if (error.response) {
            if (error.response.status === 401) {
                const authStore = useAuthStore()

                authStore.logout()

                await router.push({ name: 'login' })
            }
        }

        return Promise.reject(error)
    }
)

axios.defaults.baseURL = import.meta.env.VITE_ACCOUNTS_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

//initialize
createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

axios.defaults.headers.common['Authorization'] = "Bearer " + useAuthStore().token;
