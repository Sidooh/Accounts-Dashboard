<template>
    <div class="card mb-3">
        <div class="card-body">
            <DataTable :title="title??'Accounts'" :columns="columns" :data="accounts"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import Phone from "@/components/Phone.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { Account } from "@/utils/types";
import DataTable from "@/components/datatable/DataTable.vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

defineProps<{ title?: string; accounts: Account[] }>()

const columnHelper = createColumnHelper<Account>()
const columns = [
    columnHelper.accessor('id', {
        header: '#',
    }),
    columnHelper.accessor('phone', {
        header: 'Phone',
        cell: info => h(Phone, { phone: info.getValue() })
    }),
    columnHelper.accessor('active', {
        header: 'Active',
    }),
    columnHelper.accessor('inviter_id', {
        header: 'Inviter',
    }),
    columnHelper.accessor(r => r.user?.name, {
        header: 'User',
        id: 'user'
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
