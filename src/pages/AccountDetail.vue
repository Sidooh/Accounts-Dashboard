<script setup lang="ts">
import { useAccountsStore } from "../stores/accounts";
import { onMounted } from "vue";
import { createColumnHelper } from "@tanstack/vue-table";
import DataTable from "../components/datatable/DataTable.vue";
import { Account } from "../utils/types";

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
    columnHelper.accessor(row => row.user?.name, {
        header: () => 'User',
        id: 'user'
    }),
    // columnHelper.accessor(row => row.active, {
    //   header: () => 'Active',
    //   id: 'active'
    // }),
    columnHelper.accessor(row => row.invite_code ?? row.inviter_id, {
        header: () => 'Invite',
        id: 'invite'
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
