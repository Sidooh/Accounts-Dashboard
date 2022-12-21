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
import { createColumnHelper } from "@tanstack/vue-table";
import { Account } from "@/utils/types";
import DataTable from "@/components/datatable/DataTable.vue";

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
    columnHelper.accessor('user_id', {
        header: 'User',
    }),
]
</script>
