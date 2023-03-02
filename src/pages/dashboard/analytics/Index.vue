<template>
    <div class="row g-3 mb-3">
        <Accounts/>
        <Users/>
        <Invites/>
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
import Invites from "@/pages/dashboard/analytics/Invites.vue";
import Users from "@/pages/dashboard/analytics/Users.vue";

Chart.register(Title, SubTitle, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)
</script>
