import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from './layouts/Auth.vue'

const Dashboard = () => import("@/pages/dashboard/Index.vue")
const Accounts = () => import("@/pages/accounts/Index.vue")
const Users = () => import("@/pages/users/Index.vue")
const Invites = () => import("@/pages/invites/Index.vue")
const SecurityQuestions = () => import("@/pages/security-questions/Index.vue")

const Login = () => import("@/pages/auth/Login.vue")

const StatusPage = { template: '<div>Alive!!</div>' }

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: [
        { path: '/', component: Dashboard },
        {
            path: '/accounts', children: [
                { path: '', name: 'accounts', component: Accounts },
                { path: ':id', name: 'accounts.show', component: () => import("@/pages/accounts/Show.vue") }
            ]
        },
        { path: '/users', component: Users },
        { path: '/invites', component: Invites },
        { path: '/security-questions', component: SecurityQuestions },

        { path: '/login', component: Login, meta: { layout: AuthLayout, guest: true }, name: 'login' },

        // Status check
        { path: '/health', component: StatusPage, meta: { layout: AuthLayout, guest: true }, name: 'status.ping' },

    ], // short for `routes: routes`
})

// router.beforeEach((to) => {
//     const authStore = useAuthStore()
//
//     if (!authStore.getToken() && !to.meta.guest) return '/login'
// })

export default router