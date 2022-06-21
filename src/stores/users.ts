import {defineStore} from "pinia";
import axios from "axios";
import {useAuthStore} from "./auth";

export const useUsersStore = defineStore("user", {
    state: () => ({
        users: [],
    }),

    getters: {},

    actions: {
        async fetchUsers() {
            console.log('fetch users')
            try {
                const data = await axios.get('http://localhost:8000/api/v1/users')
                this.users = data.data
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
    }
})