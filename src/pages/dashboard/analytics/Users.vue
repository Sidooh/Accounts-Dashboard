<template>
    <div class="col-12 position-relative mt-4">
        <hr class="bg-300"/>
        <div class="divider-content-center bg-body fs-1">
            Users
            <TooltipComponent title="Refresh User Charts" placement="left">
                <LoadingButton :loading="store.loadingChart" class="btn btn-sm border-0 btn-outline-primary"
                               spinner-position="replace" @click="store.fetchUsersAnalytics">
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
                        <select class="form-select form-select-sm px-2" v-model="chartPeriodOpt"
                                @change="chartFreqOpt = chartSelectOptions[chartPeriodOpt][0]">
                            <option v-for="(vt, i) in Object.values(Period)" :key="`chart-opt-${i}`"
                                    :value="vt">{{ Str.headline(vt) }}
                            </option>
                        </select>
                    </div>
                    <div class="col-auto">
                        <select class="form-select form-select-sm px-2" v-model="chartFreqOpt"
                                :disabled="chartSelectOptions[chartPeriodOpt].length < 2">
                            <option :selected="i===0" v-for="(vt, i) in chartSelectOptions[chartPeriodOpt]"
                                    :key="`chart-opt-${i}`"
                                    :value="vt">{{ Str.headline(vt) }}
                            </option>
                        </select>
                    </div>
                </fieldset>
                <div id="users-time-series-chart" style="height: 350px;">
                    <Line :data="timeSeriesData" :options="timeSeriesOptions"/>
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
                        <select class="form-select form-select-sm px-2" v-model="chartPeriodOpt"
                                @change="chartFreqOpt = chartSelectOptions[chartPeriodOpt][0]">
                            <option v-for="(vt, i) in Object.values(Period)" :key="`chart-opt-${i}`"
                                    :value="vt">{{ Str.headline(vt) }}
                            </option>
                        </select>
                    </div>
                    <div class="col-auto">
                        <select class="form-select form-select-sm px-2" v-model="chartFreqOpt"
                                :disabled="chartSelectOptions[chartPeriodOpt].length < 2">
                            <option :selected="i===0" v-for="(vt, i) in chartSelectOptions[chartPeriodOpt]"
                                    :key="`chart-opt-${i}`"
                                    :value="vt">{{ Str.headline(vt) }}
                            </option>
                        </select>
                    </div>
                </fieldset>
                <div id="users-cumulative-chart" style="height: 350px;">
                    <Line :data="cumulativeData" :options="cumulativeOptions"/>
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

const chartPeriodOpt = ref<Period>(Period.LAST_SIX_MONTHS)
const chartFreqOpt = ref<Frequency>(Frequency.MONTHLY)

const store = useAnalyticsStore()

const data = computed(() => {
    if (store.users_time_series.length < 1) return { labels: [], dataset: [] }

    const aid = new ChartAid(chartPeriodOpt.value, chartFreqOpt.value)

    return aid.getDataset(store.users_time_series)
});

const timeSeriesData = computed<ChartData<'line'>>(() => ({
    labels: data.value.labels,
    datasets: [{
        data: data.value.dataset,
        backgroundColor: chartGradient([14, 120, 210]),
    }]
}))
const timeSeriesOptions = computed<ChartOptions<'line'>>(() => defaultLineChartOptions({
    plugins: {
        title: {
            text: 'TimeSeries',
        },
        tooltip: {
            callbacks: {
                label: (item: TooltipItem<'line'>) => `${item.formattedValue} Users`
            }
        }
    }
}))
const cumulativeData = computed<ChartData<'line'>>(() => ({
    labels: data.value.labels,
    datasets: [{
        data: data.value.dataset.reduce((a: number[], b, i) => i === 0 ? [b] : [...a, b + a[i - 1]], []),
        backgroundColor: chartGradient([14, 120, 210]),
    }]
}))
const cumulativeOptions = computed<ChartOptions<'line'>>(() => defaultLineChartOptions({
    plugins: {
        title: {
            text: 'Cumulative',
        },
        tooltip: {
            callbacks: {
                label: (item: TooltipItem<'line'>) => `${item.formattedValue} Users`
            }
        }
    }
}))

await store.fetchUsersAnalytics()
</script>