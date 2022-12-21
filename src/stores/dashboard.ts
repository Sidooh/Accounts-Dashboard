import {defineStore} from "pinia";
import axios from "axios";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        chart: {},
        statistics: {
            users: {
                total: 0
            },
            accounts: {
                total: 0
            },
            invites: {
                total: 0
            }
        },
        accounts: [],
        invites: [],
    }),

    actions: {
        async fetchChartData() {
            try {
                const data = await axios.get('dashboard/chart')
                this.chart = data.data
            } catch (e) {
                console.error(e)
            }
        },

        async fetchStatistics() {
            try {
                const data = await axios.get('dashboard/summaries')
                this.statistics = data.data
            } catch (e) {
                console.error(e)
            }
        },

        async fetchRecentAccounts() {
            try {
                const data = await axios.get('dashboard/recent-accounts')
                this.accounts = data.data
            } catch (e) {
                console.error(e)
            }
        },

        async fetchRecentInvites() {
            try {
                const data = await axios.get('dashboard/recent-invites')
                this.invites = data.data
            } catch (e) {
                console.error(e)
            }
        }
    }
})