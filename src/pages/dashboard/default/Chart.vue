<template>
    <div class="card overflow-hidden h-100">
        <div class="card-body d-flex flex-column justify-content-between"
             style="height:300px; background-image: linear-gradient(-45deg, rgba(100, 131, 129, 1), rgba(15, 27, 76, 1))">
            <div class="align-items-center gx-1 row justify-content-end">
                <div class="col-auto">
                    <TooltipComponent title="Refresh Chart" placement="left">
                        <LoadingButton :loading="store.loadingChart" class="btn btn-sm btn-outline-light"
                                       spinner-position="replace" @click="store.fetchChartData">
                            <font-awesome-icon :icon="faSync"/>
                        </LoadingButton>
                    </TooltipComponent>
                </div>
                <div class="col-auto">
                    <select class="form-select form-select-sm px-2" v-model="chartEntityOpt">
                        <option v-for="(vt, i) in Object.keys(store.chart)" :key="`chart-opt-${i}`"
                                :value="vt">{{ Str.headline(vt) }}
                        </option>
                    </select>
                </div>
                <div class="col-auto">
                    <select class="form-select form-select-sm px-2" v-model="chartPeriodOpt">
                        <option v-for="(vt, i) in Object.values(Period)" :key="`chart-opt-${i}`"
                                :value="vt">{{ Str.headline(vt) }}
                        </option>
                    </select>
                </div>
            </div>

            <Line :options="chartOptions" :data="chartData" style="margin-bottom: 2rem;"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChartAid, Frequency, Period, Str, Tooltip as TooltipComponent } from '@nabcellent/sui-vue'
import { Line } from 'vue-chartjs'
import { useDashboardStore } from "@/stores/dashboard";
import { computed, ref } from "vue";
import {
    CategoryScale,
    Chart,
    ChartData,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "@/LoadingButton.vue";

const chartEntityOpt = ref<string>("accounts")
const chartFreqOpt = ref<Frequency>(Frequency.DAILY)
const chartPeriodOpt = ref<Period>(Period.LAST_THIRTY_DAYS)

const store = useDashboardStore();

Chart.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

Chart.defaults.color = '#eee'
Chart.defaults.font.weight = '700'
Chart.defaults.font.family = "'Avenir', sans-serif"

const data = computed(() => {
    if (store.chart[chartEntityOpt.value].length < 1) return { labels: [], dataset: [] }

    const aid = new ChartAid(chartPeriodOpt.value, chartFreqOpt.value)

    return aid.getDataset(store.chart[chartEntityOpt.value])
});

const chartData = computed<ChartData<'line'>>(() => ({
    labels: data.value.labels,
    datasets: [{
        label: Str.headline(chartEntityOpt.value),
        data: data.value.dataset,
        borderColor: ['rgba(255, 255, 255, 1)'],
        borderWidth: 2,
        tension: 0.3,
    }]
}))
const chartOptions = computed<ChartOptions<'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: chartEntityOpt.value.toUpperCase(),
            font: {
                size: 17
            }
        },
        legend: {
            display: false
        },
        tooltip: {
            displayColors: false,
        }
    },
    interaction: {
        intersect: false,
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        },
        x: {
            border: {
                display: false
            },
            grid: {
                color: 'rgba(250, 250, 250, .1)',
            }
        }
    }
}))

await store.fetchChartData()
</script>

<style scoped>

</style>