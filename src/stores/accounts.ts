import {defineStore} from "pinia";
import axios from "axios";
import {useAuthStore} from "./auth";

export const useAccountsStore = defineStore("account", {
    state: () => ({
        accounts: [],
    }),

    getters: {},

    actions: {
        async fetchAccounts() {
            console.log('fetch accounts')
            try {
                const data = await axios.get('http://localhost:8000/api/v1/accounts')
                this.accounts = data.data
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
    }
})