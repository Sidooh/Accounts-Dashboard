<template>
    <div class="card overflow-hidden h-100">
        <div class="card-body d-flex flex-column justify-content-between"
             style="height:300px; background-image: linear-gradient(-45deg, rgba(100, 131, 129, 1), rgba(15, 27, 76, 1))">
            <div class="align-items-center g-0 row justify-content-end">
                <div class="col-auto">
                    <select class="form-select form-select-sm px-2" v-model="chartSelect">
                        <option v-for="(vt, i) in Object.keys(store.chart.datasets)" :key="`chart-opt-${i}`"
                                :value="vt">{{ vt.toUpperCase() }}
                        </option>
                    </select>
                </div>
            </div>

            <Line :options="chartOptions" :data="chartData" style="margin-bottom: 2rem;"/>
        </div>
    </div>
</template>

<script setup lang="ts">
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

const chartSelect = ref<string>("accounts")

const store = useDashboardStore();

Chart.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

Chart.defaults.color = '#eee'
Chart.defaults.font.weight = '700'
Chart.defaults.font.family = "'Avenir', sans-serif"

const chartData = computed<ChartData>(() => ({
    labels: store.chart.labels,
    datasets: [{
        label: `No of ${chartSelect.value}`,
        data: store.chart.datasets[chartSelect.value],
        borderColor: ['rgba(255, 255, 255, 1)'],
        borderWidth: 2,
        tension: 0.3,
    }]
}))
const chartOptions = computed<ChartOptions>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: chartSelect.value.toUpperCase(),
            font: {
                size: 17
            }
        },
        legend: {
            display: false
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