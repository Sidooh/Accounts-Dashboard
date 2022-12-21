<script setup lang="ts">

import DefaultLayout from './pages/layout/Default.vue'
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth";

const route = useRoute()

// Computed
const layout = computed(() => route.meta.layout || DefaultLayout)

onMounted(() => {
    const authStore = useAuthStore()
    authStore.checkLocalAuth()
})

</script>

<template>
    <!--  <ReloadPWA/>-->
    <component :is="layout"/>
</template>
