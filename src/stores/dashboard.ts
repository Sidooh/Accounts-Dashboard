import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import { logger } from "@nabcellent/sui-vue";
import { Frequency } from "@/utils/enums";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        loadingChart: false,
        chart: <{ [k: string]: { [k: string]: { labels: string[], data: number[] } } }>{
            LAST_12_MONTHS: {},
            LAST_30_DAYS: {}
        },
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

                await new Promise(res => {setTimeout(res, 1000);});

                console.log(res)

                const getDataset = (entity: string, duration: number, frequency: Frequency = Frequency.DAILY) => {
                    let labels: string[] = [], data: number[] = []
                    for (let i = duration; i >= 0; i--) {
                        let date = moment().subtract(i, 'd'), label = date.format('Do MMM');
                        if (frequency === Frequency.MONTHLY) {
                            date = moment().subtract(i, 'M')
                            label = date.format('MMM YY')
                        }

                        let existingSet = res[entity]?.find((x: any) => x.date == date.format('YYYYMMD'))
                        if (frequency !== Frequency.DAILY) {
                            existingSet = {
                                count: res[entity]?.filter((x: any) => {
                                    return moment(x.date, 'YYYYMMD').format('MMM YY') === label
                                })?.reduce((a: number, b: { count: number }) => a + b.count, 0)
                            }
                        }

                        labels.push(label)
                        data.push(existingSet ? existingSet.count : 0)
                    }

                    return { labels, data }
                }

                Object.keys(res).forEach(d => {
                    this.chart.LAST_12_MONTHS[d] = getDataset(d, 11, Frequency.MONTHLY)
                    this.chart.LAST_30_DAYS[d] = getDataset(d, 30)
                })

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