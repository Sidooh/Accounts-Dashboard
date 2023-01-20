<template>
    <div class="row g-3  h-100">
        <div class="col-md-4 col-xxl-12">
            <div class="card h-xl-100">
                <CardBgCorner :corner="2"/>
                <div class="card-body row">
                    <div class="col d-md-flex flex-column justify-content-center">
                        <h5 class="mb-md-0 mb-lg-2">Users</h5>
                        <h4 class="fs-3 fw-normal text-700">
                            <count-up :end-val="store.statistics?.users?.total"/>
                        </h4>
                    </div>
                    <div class="col d-flex align-items-start justify-content-end">
                        <Badge pill>
                            <count-up :end-val="store.statistics?.users?.today" class="h-100"/>
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xxl-12">
            <div class="card h-xl-100">
                <CardBgCorner/>
                <div class="card-body row">
                    <div class="col d-md-flex flex-column justify-content-center">
                        <h5 class="mb-md-0 mb-lg-2">Accounts</h5>
                        <h4 class="fs-3 fw-normal text-700">
                            <count-up :end-val="store.statistics.accounts.total"/>
                        </h4>
                    </div>
                    <div class="col d-flex align-items-start justify-content-end">
                        <Badge pill>
                            <count-up :end-val="store.statistics.accounts.today"/>
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xxl-12">
            <div class="card h-xl-100">
                <CardBgCorner :corner="3"/>
                <div class="card-body row">
                    <div class="col d-md-flex flex-column justify-content-center">
                        <h5 class="mb-md-0 mb-lg-2">Invites</h5>
                        <h4 class="fs-3 fw-normal text-700">
                            <count-up :end-val="store.statistics.invites.total"/>
                        </h4>
                    </div>
                    <div class="col d-flex align-items-start justify-content-end">
                        <Badge pill>
                            <count-up :end-val="store.statistics.invites.today"/>
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3'
import CardBgCorner from "@/components/CardBgCorner.vue";
import { useDashboardStore } from "@/stores/dashboard";
import { Badge } from "@nabcellent/sui-vue";

const store = useDashboardStore();

await store.fetchStatistics()
</script>

<style scoped>

</style>