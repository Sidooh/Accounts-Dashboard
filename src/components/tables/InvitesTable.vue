<template>
    <div class="card mb-3">
        <div class="card-body">
            <DataTable :title="title ?? 'Invites'" :columns="columns" :data="invites"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createColumnHelper } from "@tanstack/vue-table";
import { h } from "vue";
import { DataTable, Invite, PhoneNumber, StatusBadge } from "@nabcellent/sui-vue";

defineProps<{ title?: string, invites: Invite[] }>()

const columnHelper = createColumnHelper<Invite>()
const columns = [
    columnHelper.accessor('id', {
        header: '#',
    }),
    columnHelper.accessor('phone', {
        header: 'Phone',
        cell: info => h(PhoneNumber, { phone: info.getValue() })
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => h(StatusBadge, { status: info.getValue() ?? '' })
    }),
    columnHelper.accessor('inviter_id', {
        header: 'Inviter',
    }),
    columnHelper.accessor('account_id', {
        header: 'Account',
    }),
]
</script>
