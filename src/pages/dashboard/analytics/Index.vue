<template>
    <div class="row g-3 mb-3">
        <Accounts/>
    </div>
</template>

<script setup lang="ts">
import {
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    SubTitle,
    Title,
    Tooltip
} from "chart.js";
import Accounts from "@/pages/dashboard/analytics/Accounts.vue";

Chart.register(Title, SubTitle, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)
</script>
