<script setup lang="ts">
import { useSecurityQuestionsStore } from "@/stores/securityQuestions";
import { onMounted } from "vue";
import { createColumnHelper } from "@tanstack/vue-table";
import DataTable from "../../components/datatable/DataTable.vue";
import { SecurityQuestion } from "@/utils/types";

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
