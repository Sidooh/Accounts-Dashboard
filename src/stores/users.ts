import {defineStore} from "pinia";
import axios from "axios";

export const useUsersStore = defineStore("user", {
    state: () => ({
        users: <Object[]>[],
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