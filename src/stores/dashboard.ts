import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import { logger } from "@nabcellent/sui-vue";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        chart: <{ labels: string[], datasets: { [k: string]: number[] } }>{ labels: [], datasets: {} },
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
                const { data: res } = await axios.get('dashboard/chart')

                Object.keys(res).forEach(d => {
                    let labels: string[] = [], data: number[] = []
                    for (let i = 11; i >= 0; i--) {
                        const month = moment().subtract(i, 'M')
                        const label = month.format('MMM YY')

                        const existingSet = res[d]?.find((x: any) => x.date == month.format('YYYYMM'))

                        labels.push(label)
                        data.push(existingSet ? existingSet.count : 0)
                    }

                    if (this.chart.labels.length === 0) this.chart.labels = labels
                    this.chart.datasets[d] = data
                })
            } catch (e) {
                logger.error(e)
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