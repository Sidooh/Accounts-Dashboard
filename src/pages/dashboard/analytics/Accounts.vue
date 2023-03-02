<template>
    <div class="col-12 position-relative mt-4">
        <hr class="bg-300"/>
        <div class="divider-content-center bg-body fs-1">
            Accounts
            <TooltipComponent title="Refresh Account Charts" placement="left">
                <LoadingButton :loading="store.loadingChart" class="btn btn-sm border-0 btn-outline-primary"
                               spinner-position="replace" @click="store.fetchAccountsAnalytics">
                    <font-awesome-icon :icon="faSync"/>
                </LoadingButton>
            </TooltipComponent>
        </div>
    </div>
    <div class="col-12 col-xl-6">
        <div class="card rounded-3 overflow-hidden mb-3">
            <div class="bg-holder bg-card"
                 style="background-image:url( '/images/icons/spot-illustrations/corner-1.png' );"></div>
            <div class="card-body position-relative" data-chart-name="acc-time-series">
                <fieldset class="position-absolute right-0 me-3 align-items-center gx-1 row justify-content-end">
                    <div class="col-auto">
                        <select class="form-select form-select-sm px-2" v-model="timeSeriesChartPeriodOpt"
                                @change="timeSeriesChartFreqOpt = chartSelectOptions[timeSeriesChartPeriodOpt][0]">
                            <option v-for="(vt, i) in Object.values(Period)" :key="`chart-opt-${i}`"
                                    :value="vt">{{ Str.headline(vt) }}
                            </option>
                        </select>
                    </div>
                    <div class="col-auto">
                        <select class="form-select form-select-sm px-2" v-model="timeSeriesChartFreqOpt"
                                :disabled="chartSelectOptions[timeSeriesChartPeriodOpt].length < 2">
                            <option :selected="i===0" v-for="(vt, i) in chartSelectOptions[timeSeriesChartPeriodOpt]"
                                    :key="`chart-opt-${i}`"
                                    :value="vt">{{ Str.headline(vt) }}
                            </option>
                        </select>
                    </div>
                </fieldset>
                <div id="accounts-time-series-chart" style="height: 350px;">
                    <Line :data="timeSeriesChartData" :options="timeSeriesOptions"/>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-xl-6">
        <div class="card rounded-3 overflow-hidden mb-3">
            <div class="bg-holder bg-card"
                 style="background-image:url( '/images/icons/spot-illustrations/corner-3.png' );"></div>
            <div class="card-body position-relative" data-chart-name="acc-time-series">
                <fieldset class="position-absolute right-0 me-3 align-items-center gx-1 row justify-content-end">
                    <div class="col-auto">
                        <select class="form-select form-select-sm px-2" v-model="cumulativeChartPeriodOpt"
                                @change="cumulativeChartFreqOpt = chartSelectOptions[cumulativeChartPeriodOpt][0]">
                            <option v-for="(vt, i) in Object.values(Period)" :key="`chart-opt-${i}`"
                                    :value="vt">{{ Str.headline(vt) }}
                            </option>
                        </select>
                    </div>
                    <div class="col-auto">
                        <select class="form-select form-select-sm px-2" v-model="cumulativeChartFreqOpt"
                                :disabled="chartSelectOptions[cumulativeChartPeriodOpt].length < 2">
                            <option :selected="i===0" v-for="(vt, i) in chartSelectOptions[cumulativeChartPeriodOpt]"
                                    :key="`chart-opt-${i}`"
                                    :value="vt">{{ Str.headline(vt) }}
                            </option>
                        </select>
                    </div>
                </fieldset>
                <div id="accounts-cumulative-chart" style="height: 350px;">
                    <Line :data="cumulativeChartData" :options="cumulativeOptions"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ChartAid,
    chartGradient,
    chartSelectOptions,
    Frequency,
    Period,
    Str,
    Tooltip as TooltipComponent
} from '@nabcellent/sui-vue'
import { Line } from 'vue-chartjs'
import LoadingButton from "@/LoadingButton.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { computed, ref } from "vue";
import { ChartData, ChartOptions, TooltipItem } from "chart.js";
import { defaultLineChartOptions } from "@/utils/helpers";
import { useAnalyticsStore } from "@/stores/analytics";

const timeSeriesChartPeriodOpt = ref<Period>(Period.LAST_SEVEN_DAYS)
const timeSeriesChartFreqOpt = ref<Frequency>(Frequency.DAILY)
const cumulativeChartPeriodOpt = ref<Period>(Period.LAST_SEVEN_DAYS)
const cumulativeChartFreqOpt = ref<Frequency>(Frequency.DAILY)

const store = useAnalyticsStore()

const dataset = (period: Period, frequency: Frequency, cumulative = false) => {
    if (store.accounts_time_series.length < 1) return { labels: [], dataset: [] }

    let set = new ChartAid(period, frequency).getDataset(store.accounts_time_series)

    if (cumulative) {
        set.dataset = set.dataset.reduce((a: number[], b, i) => i === 0 ? [b] : [...a, b + a[i - 1]], [])
    }

    return set
}

const timeSeries = computed(() => dataset(timeSeriesChartPeriodOpt.value, timeSeriesChartFreqOpt.value));
const cumulative = computed(() => dataset(cumulativeChartPeriodOpt.value, cumulativeChartFreqOpt.value, true));

const timeSeriesChartData = computed<ChartData<'line'>>(() => ({
    labels: timeSeries.value.labels,
    datasets: [{
        data: timeSeries.value.dataset,
        backgroundColor: chartGradient([15, 27, 76]),
    }]
}))
const timeSeriesOptions = computed<ChartOptions<'line'>>(() => defaultLineChartOptions({
    plugins: {
        title: {
            text: 'TimeSeries',
        },
        tooltip: {
            callbacks: {
                label: (item: TooltipItem<'line'>) => `${item.formattedValue} Accounts`
            }
        }
    }
}))
const cumulativeChartData = computed<ChartData<'line'>>(() => ({
    labels: cumulative.value.labels,
    datasets: [{
        data: cumulative.value.dataset,
        backgroundColor: chartGradient([245, 180, 0]),
    }]
}))
const cumulativeOptions = computed<ChartOptions<'line'>>(() => defaultLineChartOptions({
    plugins: {
        title: {
            text: 'Cumulative',
        },
        tooltip: {
            callbacks: {
                label: (item: TooltipItem<'line'>) => `${item.formattedValue} Accounts`
            }
        }
    }
}))

await store.fetchAccountsAnalytics()
</script>