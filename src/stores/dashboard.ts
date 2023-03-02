import { defineStore } from "pinia";
import axios from "axios";
import { logger } from "@/utils/logger";
import { RawAnalytics } from "@/utils/types";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        loadingChart: false,
        chart: <{ [k: string]: RawAnalytics[] }>{},
        statistics: {
            users: {
                total: 0,
                today: 0
            },
            accounts: {
                total: 0,
                today: 0
            },
            invites: {
                total: 0,
                today: 0
            }
        },
        accounts: [],
        invites: [],
    }),

    actions: {
        async fetchChartData() {
            try {
                this.loadingChart = true

                const { data: res } = await axios.get('dashboard/chart')

                this.chart = res

                this.loadingChart = false
            } catch (e) {
                logger.error(e)

                this.loadingChart = false
            }
        },

        async fetchStatistics() {
            try {
                const data = await axios.get('dashboard/summaries')

                this.statistics = data.data
            } catch (e) {
                logger.error(e)
            }
        },

        async fetchRecentAccounts() {
            try {
                const { data } = await axios.get('dashboard/recent-accounts')

                logger.log('Recent Accounts', data)

                this.accounts = data
            } catch (e) {
                logger.error(e)
            }
        },

        async fetchRecentInvites() {
            try {
                const { data } = await axios.get('dashboard/recent-invites')
                logger.log('Recent Invites', data)
                this.invites = data
            } catch (e) {
                logger.error(e)
            }
        }
    }
})