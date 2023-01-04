import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: {}
    }),

    actions: {
        async authenticate(email: string, password: string) {
            await new Promise(r => setTimeout(r, 3000));
            try {
                const data: { access_token: string } = await axios.post("users/signin", {
                    email,
                    password
                })

                this.user = {
                    token: data.access_token
                }

                localStorage.setItem("token", data.access_token);

                axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;
            } catch (err: any) {
                if (err?.status === 400 && err?.data) {
                    throw new Error(err.data.errors[0].message)
                }
                throw new Error('Something went wrong, contact support')
            }
        },

        getToken() {
            const token = localStorage.getItem("token")

            if (!token) {
                this.logout()
                return
            }

            return token
        },

        checkLocalAuth() {
            this.getToken()
        },

        async logout() {
            localStorage.removeItem('token')

            this.$reset()

            await router.push({ name: 'login' })
        }
    }
})