import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";
import moment from "moment";
import { JWT, logger } from "@nabcellent/sui-vue";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: <string | null>null,
        user: {}
    }),

    actions: {
        async authenticate(email: string, password: string) {
            try {
                const data: { access_token: string } = await axios.post("users/signin", {
                    email,
                    password
                })

                this.user = {
                    token: data.access_token
                }

                localStorage.setItem("token", data.access_token);

                this.token = data.access_token

                axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;
            } catch (err: any) {
                if (err?.status === 400 && err?.data) {
                    throw new Error(err.data.errors[0].message)
                }
                throw new Error('Something went wrong, contact support')
            }
        },

        checkLocalAuth() {
            this.token = localStorage.getItem("token")
            this.user = JSON.parse(String(localStorage.getItem("user")))

            if(this.token) {
                const tokenData = JWT.decode(this.token)
                const expiresIn = moment.unix(tokenData.exp).diff(moment(), 'minutes');

                logger.log(`Session expires in: ${expiresIn} minutes`);

                if (moment.unix(tokenData.exp).isBefore(moment())) this.logout()
            }
        },

        logout() {
            localStorage.removeItem('token')

            this.$reset()

            router.push({ name: 'login' })
        }
    }
})