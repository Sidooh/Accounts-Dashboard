<script setup lang="ts">
import { useInvitesStore } from "../stores/invites";
import { onMounted } from "vue";
import { createColumnHelper } from "@tanstack/vue-table";
import DataTable from "../components/datatable/DataTable.vue";

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

onMounted(() => store.fetchInvites())
</script>

<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Invites" :columns="columns" :data="store.invites"/>
        </div>
    </div>
</template>