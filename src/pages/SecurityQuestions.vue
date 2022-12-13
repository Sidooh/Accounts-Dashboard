<script setup lang="ts">
import {useSecurityQuestionsStore} from "../stores/securityQuestions";
import {computed, onMounted, ref} from "vue";
import Table from "../components/core/table.vue";
import {createColumnHelper} from "@tanstack/vue-table";

const store = useSecurityQuestionsStore();

const search = ref()

const securityQuestions = computed(() => store.securityQuestions)

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
      <Table
          title="Security Questions"
          :columns="columns"
          :data="securityQuestions"
      />
    </div>
  </div>
</template>
