import { defineStore } from "pinia";
import axios from "axios";
import { User } from "@nabcellent/sui-vue";
import { logger } from "@/utils/logger";

export const useUsersStore = defineStore("user", {
    state: () => ({
        user: <User | undefined>undefined,
        users: <User[]>[],
    }),

    actions: {
        async fetchUsers() {
            try {
                const { data } = await axios.get('users')

                this.users = data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchUser(id: number) {
            try {
                const { data } = await axios.get(`users/${id}`)

                logger.log(data)
                this.user = data
            } catch (err) {
                logger.error(err)
            }
        },
        async resetPassword(id: number) {
            try {
                //  TODO:   Implement custom sms notification for pin reset.
                const { data } = await axios.post(`users/${id}/reset-password`)

                return data
            } catch (err) {
                logger.error(err)
            }
        }
    }
})