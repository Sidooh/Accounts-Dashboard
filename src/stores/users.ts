import { defineStore } from "pinia";
import axios from "axios";
import { User } from "../utils/types";

export const useUsersStore = defineStore("user", {
    state: () => ({
        users: <User[]>[],
    }),

    actions: {
        async fetchUsers() {
            console.log('fetch users')
            try {
                const data = await axios.get('users')
                this.users = data.data
            } catch (e) {
                console.error(e)
            }
        }
    }
})