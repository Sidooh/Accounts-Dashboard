import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

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

                console.log(this.chart)
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