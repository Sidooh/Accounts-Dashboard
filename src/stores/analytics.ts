import { defineStore } from "pinia";
import axios from "axios";
import { logger } from "@/utils/logger";

export const useAnalyticsStore = defineStore("analytics", {
    state: () => ({
        loadingChart: false,
        accounts_time_series: {},
    }),

    actions: {
        async fetchAccountsAnalytics() {
            try {
                this.loadingChart = true

                const { data: res } = await axios.get('/analytics/accounts')

                this.accounts_time_series = res

                this.loadingChart = false
            } catch (e) {
                logger.error(e)

                this.loadingChart = false
            }
        },
    }
})