<script setup lang="ts">
import { useSecurityQuestionsStore } from "@/stores/securityQuestions";
import { h, onMounted } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { SecurityQuestion } from "@/utils/types";
import { DataTable, TableDate } from "@nabcellent/sui-vue";

const store = useSecurityQuestionsStore();

const columnHelper = createColumnHelper<SecurityQuestion>()
const columns = [
    columnHelper.accessor(row => row.id, {
        header: '#',
        id: 'id'
    }),
    columnHelper.accessor(row => row.question, {
        header: () => 'Question',
        id: 'question'
    }),
    columnHelper.accessor(row => row.status, {
        header: () => 'Status',
        id: 'status'
    }),
    columnHelper.accessor('created_at', {
        header: 'Created',
        cell: ({ row }: CellContext<SecurityQuestion, string>) => h(TableDate, { date: row.original.created_at })
    }),
]

onMounted(() => store.fetchSecurityQuestions())
</script>

<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Security Questions" :columns="columns" :data="store.securityQuestions"/>
        </div>
    </div>
</template>
