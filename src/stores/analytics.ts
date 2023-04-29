import { defineStore } from "pinia";
import axios from "axios";
import { logger } from "@/utils/logger";
import { Account, RawAnalytics } from "@nabcellent/sui-vue";
import moment from "moment";

export const useAnalyticsStore = defineStore("analytics", {
    state: () => ({
        loadingChart: false,
        accounts_time_series: <RawAnalytics[]>[],
        users_time_series: <RawAnalytics[]>[],
        invites_time_series: <RawAnalytics[]>[],
        statistics: {
            invite_accounts: {
                total: 0,
                today: 0
            }, social_accounts: {
                total: 0,
                today: 0
            }, root_accounts: {
                total: 0,
                today: 0
            }
        },
        slos: {
            uptime: '',
            request_count: 0,
            statuses: {},
            success_rate: 0,
        }
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
        async fetchUsersAnalytics() {
            try {
                this.loadingChart = true

                const { data: res } = await axios.get('/analytics/users')

                this.users_time_series = res

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
        async fetchAccountStatistics() {
            try {
                this.loadingChart = true

                const { data: res } = await axios.get('/accounts')

                this.statistics = res.reduce((a: any, v: Account) => {
                        const createdToday = moment(v.created_at).isSame(moment().startOf('d'), 'd')

                        if (v.inviter_id) {
                            a.invite_accounts.total += 1
                            if (createdToday) a.invite_accounts.today += 1
                        } else if (v.invite_code) {
                            a.social_accounts.total += 1
                            if (createdToday) a.social_accounts.today += 1
                        } else {
                            a.root_accounts.total += 1
                            if (createdToday) a.root_accounts.today += 1
                        }

                        return a
                    }, {
                        invite_accounts: {
                            total: 0,
                            today: 0
                        }, social_accounts: {
                            total: 0,
                            today: 0
                        }, root_accounts: {
                            total: 0,
                            today: 0
                        }
                    }
                )

                this.loadingChart = false
            } catch (e) {
                this.loadingChart = false

                logger.error(e)
            }
        },

        async fetchAccountsSlo() {
            try {
                this.loadingChart = true

                const res: {
                    uptime: string,
                    request_count: number,
                    statuses: {[key: number]: number},
                    success_rate: number
                } = await axios.get('/stats')

                res.uptime = moment(res.uptime).fromNow(true)
                res.success_rate = 100 - ((1 / res.request_count) || 0)

                this.slos = res

                this.loadingChart = false
            } catch (e) {
                this.loadingChart = false

                logger.error(e)
            }
        },
    }
})