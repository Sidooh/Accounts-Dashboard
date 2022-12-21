import { defineStore } from "pinia";
import axios from "axios";
import { Account } from "../utils/types";

export const useAccountsStore = defineStore("account", {
    state: () => ({
        accounts: <Account[]>[],
    }),

    actions: {
        async fetchAccounts() {
            try {
                const { data } = await axios.get('accounts?with_user=true')

                console.log(data)
                this.accounts = data
            } catch (e) {
                console.error(e)
            }
        }
    }
})