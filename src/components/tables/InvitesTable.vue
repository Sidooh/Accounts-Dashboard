<template>
    <div class="card mb-3">
        <div class="card-body">
            <DataTable :title="title ?? 'Invites'" :columns="columns" :data="invites"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { h } from "vue";
import { DataTable, PhoneNumber, StatusBadge, TableDate } from "@nabcellent/sui-vue";
import { Invite } from "@/utils/types";

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
    columnHelper.accessor(r => `${r.phone}: ${r.user?.name}`, {
        header: 'Inviter',
        cell: ({ row: { original: acc } }) => acc.inviter ? h('div', [
            h('div', acc.inviter.user?.name ?? '-'),
            h(PhoneNumber, { phone: acc.inviter.phone }),
        ]) : 'Root-level User'
    }),
    columnHelper.accessor('created_at', {
        header: 'Created',
        cell: ({ row }: CellContext<Invite, string>) => h(TableDate, { date: row.original.created_at })
    }),
]
</script>
