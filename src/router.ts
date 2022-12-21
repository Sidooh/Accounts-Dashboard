import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from 'pages/layout/Auth.vue'

const Home = () => import("pages/Home.vue")
const Accounts = () => import("pages/Accounts.vue")
const AccountDetail = () => import("pages/AccountDetail.vue")
const Users = () => import("pages/Users.vue")
const Invites = () => import("pages/Invites.vue")
const SecurityQuestions = () => import("pages/SecurityQuestions.vue")

const Login = () => import("pages/auth/Login.vue")

const StatusPage = { template: '<div>Alive!!</div>' }


// Should not be async -- will conflict with internal async components
// const Auth = () => import("pages/layout/Auth.vue")


const routes = [

    { path: '/', component: Home },
    { path: '/accounts', component: Accounts },
    { path: '/accounts/:id', component: AccountDetail },
    { path: '/users', component: Users },
    { path: '/invites', component: Invites },
    { path: '/security-questions', component: SecurityQuestions },

    { path: '/login', component: Login, meta: { layout: AuthLayout, guest: true }, name: 'login' },

    // Status check
    { path: '/health', component: StatusPage, meta: { layout: AuthLayout, guest: true }, name: 'status.ping' },

]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

// router.beforeEach((to) => {
//     const authStore = useAuthStore()
//
//     if (!authStore.getToken() && !to.meta.guest) return '/login'
// })

export default router