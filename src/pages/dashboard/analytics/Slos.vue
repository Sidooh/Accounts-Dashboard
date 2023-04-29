<template>
    <div class="col-12 position-relative mt-4">
        <hr class="bg-300"/>
        <div class="divider-content-center bg-body fs-1">
            Slos
            <Tooltip title="Refresh Account Charts" placement="left">
                <LoadingButton :loading="store.loadingChart" class="btn btn-sm border-0 btn-outline-primary"
                               spinner-position="replace" @click="store.fetchAccountsSlo()">
                    <font-awesome-icon :icon="faSync"/>
                </LoadingButton>
            </Tooltip>
        </div>
    </div>
    <div class="col-12 col-lg-4">
        <div class="card bg-line-chart-gradient dark h-xl-100">
            <CardBgCorner :corner="2"/>
            <div class="card-body row">
                <div class="col d-md-flex flex-column justify-content-center">
                    <h6 class="text-dark">Requests</h6>
                    <h4 class="m-0 text-dark">
                        <count-up :end-val="store.slos.request_count"/>
                    </h4>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-lg-4">
        <div class="card bg-line-chart-gradient dark h-xl-100">
            <CardBgCorner/>
            <div class="card-body row">
                <div class="col d-md-flex flex-column justify-content-center">
                    <h6 class="text-dark">Uptime</h6>
                    <h4 class="m-0 text-dark">
                        {{ store.slos?.uptime }}
                    </h4>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-lg-4">
        <div class="card bg-line-chart-gradient dark h-xl-100">
            <CardBgCorner :corner="3"/>
            <div class="card-body row">
                <div class="col d-md-flex flex-column justify-content-center">
                    <h6 class="text-dark">Success Rate</h6>
                    <h4 class="m-0 text-dark">
                        <count-up :end-val="store.slos.success_rate" :options="{suffix: '%'}"/>
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3'
import { CardBgCorner, Tooltip } from "@nabcellent/sui-vue";
import LoadingButton from "@/LoadingButton.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { useAnalyticsStore } from "@/stores/analytics";

const store = useAnalyticsStore();

await store.fetchAccountsSlo()
</script>

<style scoped>

</style>