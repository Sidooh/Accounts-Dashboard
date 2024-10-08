import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from './layouts/Auth.vue'
import { useAuthStore } from "@/stores/auth";
import Login from "@/pages/auth/Login.vue";

const Users = () => import("@/pages/users/Index.vue")
const Invites = () => import("@/pages/invites/Index.vue")
const SecurityQuestions = () => import("@/pages/security-questions/Index.vue")

const StatusPage = { template: '<div>Alive!!</div>' }

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard', meta: { auth: true }, children: [
                { path: '', name: 'dashboard', component: () => import("@/pages/dashboard/default/Index.vue"), },
                {
                    path: 'analytics',
                    name: 'dashboard.analytics',
                    component: () => import("@/pages/dashboard/analytics/Index.vue"),
                }
            ]
        },
        {
            path: '/accounts', meta: { auth: true }, children: [
                { path: '', name: 'accounts', component: () => import("@/pages/accounts/Index.vue") },
                { path: ':id', name: 'accounts.show', component: () => import("@/pages/accounts/Show.vue") }
            ]
        },
        {
            path: '/users', meta: { auth: true }, children: [
                { path: '', name: 'users', component: Users },
                { path: ':id', name: 'users.show', component: () => import("@/pages/users/Show.vue") }
            ]
        },
        { path: '/invites', component: Invites, meta: { auth: true } },
        { path: '/security-questions', component: SecurityQuestions, meta: { auth: true } },

        { path: '/login', component: Login, meta: { layout: AuthLayout }, name: 'login' },

        // Status check
        { path: '/health', component: StatusPage, meta: { layout: AuthLayout }, name: 'status.ping' },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            redirect: () => ({ name: 'dashboard' })
        },

    ], // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    const { token } = useAuthStore()

    if (!token && to.meta.auth) {
        localStorage.setItem('urlIntended', to.path)

        next({ name: 'login' });
    } else if (!to.meta.auth && token) {
        next({ name: 'dashboard' });
    } else {
        next()
    }
})

export default router
