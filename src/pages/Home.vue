<template>
    <div class="row g-3 mb-3">
        <div class="col-md-4">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    Today
                    <count-up :end-val="store.statistics?.users?.today"/>
                </div>
                <div>
                    Total
                    <count-up :end-val="store.statistics?.users?.total"/>
                </div>
                <div class="card-footer bg-primary text-white border-top-0">
                    Users
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    Today
                    <count-up :end-val="store.statistics.accounts.today"/>
                </div>
                <div>
                    Total
                    <count-up :end-val="store.statistics.accounts.total"/>
                </div>
                <div class="card-footer bg-primary text-white border-top-0">
                    Accounts
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    Today
                    <count-up :end-val="store.statistics.invites.today"/>
                </div>
                <div>
                    Total
                    <count-up :end-val="store.statistics.invites.total"/>
                </div>
                <div class="card-footer bg-primary text-white border-top-0">
                    Invites
                </div>
            </div>
        </div>
    </div>

    <Accounts class="mb-3"/>

    <Invites/>

</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3'
import { useDashboardStore } from "../stores/dashboard";
import Invites from "./Invites.vue";
import Accounts from "./Accounts.vue";

const store = useDashboardStore();

store.fetchChartData()

store.fetchStatistics()

</script>

<style>
.card-footer {
    background: #0F1B4C !important;
}
</style>