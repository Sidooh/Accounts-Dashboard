import { defineStore } from "pinia";
import axios from "axios";
import { Account, groupBy, logger } from "@nabcellent/sui-vue";

export const useAccountsStore = defineStore("account", {
    state: () => ({
        account: <Account>{},
        accounts: <Account[]>[],
        ancestors: <Account[]>[],
        descendants: <{ total: number, ripples: { [l: number]: Account[] } }>{},
    }),

    actions: {
        async fetchAccounts() {
            try {
                const { data } = await axios.get('accounts?with_user=true&with_inviter=true')

                logger.log(data)

                this.accounts = data ?? []
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchAccount(id: number) {
            try {
                const { data } = await axios.get(`accounts/${id}?with_user=true&with_inviter=true`)

                logger.log('Accounts', data)

                this.account = data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchAncestors(accountId: number) {
            try {
                const { data } = await axios.get(`accounts/${accountId}/ancestors?level_limit=5`)

                this.ancestors = data.filter((a: Account) => a.level !== 0)
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchDescendants(accountId: number) {
            try {
                const { data } = await axios.get(`accounts/${accountId}/descendants?level_limit=5`),
                    descendants = data.filter((a: Account) => a.level !== 0)

                this.descendants.ripples = groupBy(descendants, 'level')
                this.descendants.total = descendants.length
            } catch (e) {
                logger.error(e)
            }
        },
        async resetPin(accountId: number) {
            try {
                // await new Promise(r => setTimeout(r, 3000));
                const { data } = await axios.post(`/accounts/${accountId}/reset-pin`)

                return data
            } catch (err) {
                logger.log(err)
            }
        }
    }
})