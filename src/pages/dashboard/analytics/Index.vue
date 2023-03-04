<template>
    <div class="row g-3 mb-3">
        <ComponentLoader>
            <Accounts/>
        </ComponentLoader>
        <ComponentLoader>
            <Users/>
        </ComponentLoader>
        <ComponentLoader>
            <Invites/>
        </ComponentLoader>
        <ComponentLoader>
            <Statistics/>
        </ComponentLoader>
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
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import Statistics from "@/pages/dashboard/analytics/Statistics.vue";

Chart.register(Title, SubTitle, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)
Chart.defaults.font.family = "'Avenir', sans-serif"
</script>
