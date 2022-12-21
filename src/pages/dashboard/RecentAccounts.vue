<template>
    <div class="card mb-3">
        <div class="card-body">
            <DataTable title="Recent Accounts" :columns="columns" :data="store.accounts"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from "../../stores/accounts";
import { createColumnHelper } from "@tanstack/vue-table";
import DataTable from "../../components/datatable/DataTable.vue";
import { Account } from "../../utils/types";

const store = useAccountsStore();

const columnHelper = createColumnHelper<Account>()

const columns = [
    columnHelper.accessor(row => row.id, {
        header: '#',
        id: 'id'
    }),
    columnHelper.accessor(row => row.phone, {
        header: () => 'Phone',
        id: 'phone'
    }),
    columnHelper.accessor(row => row.active, {
        header: () => 'Active',
        id: 'active'
    }),
    columnHelper.accessor(row => row.inviter_id, {
        header: () => 'Inviter',
        id: 'inviter'
    }),
    columnHelper.accessor(row => row.user_id, {
        header: () => 'User',
        id: 'user'
    }),
]

await store.fetchAccounts()
</script>

<style scoped>

</style>