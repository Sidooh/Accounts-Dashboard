import { defineStore } from "pinia";
import axios from "axios";
import { logger } from "@/utils/logger";
import { RawAnalytics } from "@nabcellent/sui-vue";

export const useAnalyticsStore = defineStore("analytics", {
    state: () => ({
        loadingChart: false,
        accounts_time_series: <RawAnalytics[]>[],
        invites_time_series: <RawAnalytics[]>[],
    }),

    actions: {
        async fetchAccountsAnalytics() {
            try {
                this.loadingChart = true

                const { data: res } = await axios.get('/analytics/accounts')

                this.accounts_time_series = res

                this.loadingChart = false
            } catch (e) {
                this.loadingChart = false

                logger.error(e)
            }
        },
        async fetchInvitesAnalytics() {
            try {
                this.loadingChart = true

                const { data: res } = await axios.get('/analytics/invites')

                this.invites_time_series = res

                this.loadingChart = false
            } catch (e) {
                this.loadingChart = false

                logger.error(e)
            }
        },
    }
})