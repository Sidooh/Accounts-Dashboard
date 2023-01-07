<template>
    <AccountsTable title="Recent Accounts" :accounts="store.accounts"/>
</template>

<script setup lang="ts">
import AccountsTable from "@/components/tables/AccountsTable.vue";
import { useDashboardStore } from "@/stores/dashboard";

const store = useDashboardStore();

await store.fetchRecentAccounts()
</script>

<style scoped>

</style>