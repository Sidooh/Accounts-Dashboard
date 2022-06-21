import {createApp} from 'vue'

//modules
import {createPinia} from "pinia";
import axios from "axios";

//component
import App from './App.vue'
import router from "./routes";
import {useAuthStore} from "./stores/auth";


axios.defaults.baseURL = 'http://localhost:8000/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';


//initialize
createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')

await useAuthStore().authenticate();
