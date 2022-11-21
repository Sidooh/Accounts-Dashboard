<script setup lang="ts">
import { useAccountsStore } from "../stores/accounts";
import { onMounted } from "vue";
import { createColumnHelper } from "@tanstack/vue-table";
import DataTable from "../components/datatable/DataTable.vue";

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

onMounted(() => store.fetchAccounts())
</script>

<template>

    <div class="card">
        <div class="card-body">
            <DataTable title="Accounts" :columns="columns" :data="store.accounts"/>
        </div>
    </div>

</template>
