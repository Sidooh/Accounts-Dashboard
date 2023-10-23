import { createApp } from 'vue'

//modules
import { createPinia } from "pinia"
import axios from "axios"

//  component
import App from './App.vue'
import router from "./router"
import { useAuthStore } from "./stores/auth"
import { defaultConfig, plugin } from '@formkit/vue'

import 'bootstrap/dist/js/bootstrap.min.js'
import '@nabcellent/sui-vue/dist/style.css'

axios.interceptors.response.use(
    ({ data }) => (data && data.result === 0) ? Promise.reject(data) : data,
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
    .use(plugin, defaultConfig)
    .mount('#app')

axios.defaults.headers.common['Authorization'] = "Bearer " + useAuthStore().token;