import { createApp } from 'vue'

//modules
import { createPinia } from "pinia"
import axios from "axios"

//component
import App from './App.vue'
import router from "./router"
import { useAuthStore } from "./stores/auth"

import 'bootstrap/dist/js/bootstrap.min.js'

axios.interceptors.response.use(
    ({ data }) => {
        if (data && data.result === 0)
            return Promise.reject(data)

        return data
    },
    async ({ response }) => {
        if (response?.status === 401) {
            const authStore = useAuthStore()

            await authStore.logout()

            router.push({ name: 'login' })
        }

        return Promise.reject(response)
    }
)
axios.defaults.baseURL = import.meta.env.VITE_ACCOUNTS_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

//initialize
createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')

axios.defaults.headers.common['Authorization'] = "Bearer " + useAuthStore().getToken();