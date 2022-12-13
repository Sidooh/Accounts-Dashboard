import {defineStore} from "pinia";
import axios from "axios";

export const useAccountsStore = defineStore("account", {
    state: () => ({
        accounts: <Account[]>[],
    }),

    actions: {
        async fetchAccounts() {
            try {
                const data = await axios.get('accounts?with_user=true')
                this.accounts = data.data
            } catch (e) {
                console.error(e)
            }
        }
    }
})