<template>
    <div class="card mb-3">
        <div class="card-body">
            <DataTable :title="title??'Accounts'" :columns="columns" :data="accounts"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Account, DataTable, PhoneNumber, Status, StatusBadge, TableDate } from "@nabcellent/sui-vue";

defineProps<{ title?: string; accounts: Account[] }>()

const columnHelper = createColumnHelper<Account>()
const columns = [
    columnHelper.accessor('id', {
        header: '#',
    }),
    columnHelper.accessor(r => `${r.phone}: ${r.user?.name}`, {
        header: 'User',
        id: 'user',
        cell: ({ row: { original: acc } }: CellContext<Account, string>) => h('div', [
            h('div', acc.user?.name ?? '-'),
            h(PhoneNumber, { phone: acc.phone }),
        ]),
    }),
    columnHelper.accessor('active', {
        header: 'Status',
        cell: info => h(StatusBadge, { status: Status[info.getValue() ? 'ACTIVE' : 'INACTIVE'] })
    }),
    columnHelper.accessor(r => `${r.phone}: ${r.user?.name}`, {
        header: 'Inviter',
        cell: ({ row: { original: acc } }) => acc.inviter ? h('div', [
            h('div', acc.inviter?.user?.name || '-'),
            h(PhoneNumber, { phone: acc.inviter.phone }),
        ]) : 'Root-level User'
    }),
    columnHelper.accessor('created_at', {
        header: 'Created',
        cell: ({ row }: CellContext<Account, string>) => h(TableDate, { date: row.original.created_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row: { original } }: CellContext<Account, string>) => h('div', { class: 'd-flex justify-content-evenly' }, [
            h(
                RouterLink,
                { to: { name: 'accounts.show', params: { id: original.id } } },
                () => h(FontAwesomeIcon, { icon: faEye })
            ),
        ])
    },
]
</script>
