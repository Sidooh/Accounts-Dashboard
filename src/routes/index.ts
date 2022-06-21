import {createRouter, createWebHistory} from "vue-router";

const Home = () => import("../pages/Home.vue")
const Accounts = () => import("../pages/Accounts.vue")
const Users = () => import("../pages/Users.vue")
const Invites = () => import("../pages/Invites.vue")
const SecurityQuestions = () => import("../pages/SecurityQuestions.vue")

const routes = [
    { path: '/', component: Home },
    { path: '/accounts', component: Accounts },
    { path: '/users', component: Users },
    { path: '/invites', component: Invites },
    { path: '/security-questions', component: SecurityQuestions },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})


export default router