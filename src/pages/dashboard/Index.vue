<template>
    <div class="row g-3">
        <div class="col-xxl-9">
            <Chart/>
        </div>
        <div class="col">
            <ComponentLoader><Statistics/></ComponentLoader>
        </div>
    </div>

    <RecentAccounts/>

    <RecentInvites/>
</template>

<script setup lang="ts">

import Chart from "./Chart.vue";
import Statistics from "./Statistics.vue";
import RecentAccounts from "./RecentAccounts.vue";
import RecentInvites from "./RecentInvites.vue";
import ComponentLoader from "../../components/loaders/ComponentLoader.vue";</script>

<style scoped>

</style>