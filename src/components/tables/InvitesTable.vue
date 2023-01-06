<template>
    <div class="card mb-3">
        <div class="card-body">
            <DataTable :title="title ?? 'Invites'" :columns="columns" :data="invites"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Phone from "@/components/Phone.vue";
import { createColumnHelper } from "@tanstack/vue-table";
import { Account, Invite } from "@/utils/types";
import DataTable from "@/components/datatable/DataTable.vue";
import { h } from "vue";
import StatusBadge from "@/components/StatusBadge.vue";
import { Status } from "@/utils/enums";

defineProps<{ title?: string, invites: Invite[] }>()

const columnHelper = createColumnHelper<Invite>()
const columns = [
    columnHelper.accessor('id', {
        header: '#',
    }),
    columnHelper.accessor('phone', {
        header: 'Phone',
        cell: info => h(Phone, { phone: info.getValue() })
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
