import { defineStore } from "pinia";
import axios from "axios";
import { User } from "@/utils/types";
import { logger } from "@/utils/logger";

export const useUsersStore = defineStore("user", {
    state: () => ({
        user: <User | undefined>undefined,
        users: <User[]>[],
    }),

    actions: {
        async fetchUsers() {
            try {
                const data = await axios.get('users')

                this.users = data.data
            } catch (e) {
                console.error(e)
            }
        },
        async fetchUser(id: number) {
            try {
                const { data } = await axios.get(`users/${id}`)

                console.log(data)
                this.user = data
            } catch (err) {
                logger.error(err)
            }
        }
    }
})