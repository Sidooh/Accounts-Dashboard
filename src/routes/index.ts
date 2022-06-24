import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "../stores/auth";
import {defineAsyncComponent} from "vue";

const Home = () => import("../pages/Home.vue")
const Accounts = () => import("../pages/Accounts.vue")
const Users = () => import("../pages/Users.vue")
const Invites = () => import("../pages/Invites.vue")
const SecurityQuestions = () => import("../pages/SecurityQuestions.vue")

const Login = () => import("../pages/Login.vue")
const Auth = defineAsyncComponent (() => import("../components/layout/Auth.vue"))

const routes = [

    { path: '/', component: Home },
    { path: '/accounts', component: Accounts },
    { path: '/users', component: Users },
    { path: '/invites', component: Invites },
    { path: '/security-questions', component: SecurityQuestions },

    { path: '/login', component: Login, meta: { layout: Auth, guest: true }, name: 'login' },

]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to) => {
    // const authStore = useAuthStore()

    // if (!authStore.token && to.meta.guest) return '/login'
})

export default router