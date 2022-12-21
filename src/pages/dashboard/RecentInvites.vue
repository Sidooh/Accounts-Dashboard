<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Recent Invites" :columns="columns" :data="store.invites"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useInvitesStore } from "stores/invites";
import { createColumnHelper } from "@tanstack/vue-table";
import DataTable from "components/datatable/DataTable.vue";
import { Invite } from "../../utils/types";

const store = useInvitesStore();

const columnHelper = createColumnHelper<Invite>()
const columns = [
    columnHelper.accessor(row => row.id, {
        header: '#',
        id: 'id'
    }),
    columnHelper.accessor(row => row.phone, {
        header: () => 'Phone',
        id: 'phone'
    }),
    columnHelper.accessor(row => row.status, {
        header: () => 'Status',
        id: 'status'
    }),
    columnHelper.accessor(row => row.inviter_id, {
        header: () => 'Inviter',
        id: 'inviter'
    }),
    columnHelper.accessor(row => row.account_id, {
        header: () => 'Account',
        id: 'account'
    }),
]

await store.fetchInvites()
</script>