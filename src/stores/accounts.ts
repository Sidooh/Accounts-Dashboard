import {defineStore} from "pinia";
import axios from "axios";

export const useAccountsStore = defineStore("account", {
    state: () => ({
        accounts: <[]>[],
    }),

    actions: {
        async fetchAccounts() {

            console.log('fetch accounts')
            try {
                const data = await axios.get('accounts')
                this.accounts = data.data
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
    }
})