<template>
    <AccountsTable v-if="store.ancestors.length" title="Ancestors" :accounts="store.ancestors"/>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/stores/accounts";
import AccountsTable from "@/components/tables/AccountsTable.vue";

const props = defineProps<{ accountId: number }>()

const store = useAccountsStore();

await store.fetchAncestors(props.accountId)
</script>