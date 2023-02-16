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
import {
    Account,
    accountAccessor,
    DataTable,
    getRelativeDateAndTime,
    PhoneNumber,
    Status,
    StatusBadge,
    TableDate
} from "@nabcellent/sui-vue";

defineProps<{ title?: string; accounts: Account[] }>()

const columnHelper = createColumnHelper<Account>()
const columns = [
    columnHelper.accessor('id', {
        header: '#',
    }),
    columnHelper.accessor(accountAccessor, {
        header: 'User',
        id: 'user',
        cell: ({ row: { original: acc } }: CellContext<Account, string>) => h('div', [
            h('div', acc.user?.name ?? '-'),
            h(PhoneNumber, { phone: acc.phone }),
        ]),
    }),
    columnHelper.accessor(r => r.active ? Status.ACTIVE : Status.INACTIVE, {
        header: 'Status',
        cell: info => h(StatusBadge, { status: Status[info.getValue() ? Status.ACTIVE : Status.INACTIVE] })
    }),
    columnHelper.accessor(r => {
        if(r.inviter) {
            return accountAccessor(r.inviter)
        } else if(r.invite_code) {
            return r.invite_code
        } else return 'Root-level User'
    }, {
        header: 'Inviter',
        cell: ({ row: { original: acc } }) => {
            if (acc.inviter) {
                return h('div', [
                    h('div', acc.inviter?.user?.name || '-'),
                    h(PhoneNumber, { phone: acc.inviter.phone }),
                ])
            } else if (acc.invite_code) {
                return h('b', h('code', acc.invite_code))
            } else return 'Root-level User'
        }
    }),
    columnHelper.accessor(r => getRelativeDateAndTime(r.created_at as string).toString(), {
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
