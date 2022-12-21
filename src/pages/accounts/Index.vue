<template>
    <AccountsTable :accounts="store.accounts"/>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/stores/accounts";
import AccountsTable from "@/components/tables/AccountsTable.vue";

const store = useAccountsStore();

await store.fetchAccounts()
</script>

<style scoped>

</style>