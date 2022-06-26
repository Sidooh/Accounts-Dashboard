<script setup lang="ts">
import {useSecurityQuestionsStore} from "../stores/securityQuestions";
import {computed, onMounted} from "vue";
import Table from "../components/core/table.vue";

const store = useSecurityQuestionsStore();

const securityQuestions = computed(() => store.securityQuestions)

const columns = computed(() => [
  {
    name: 'id',
    title: '#'
  },
  {
    name: 'question',
    title: 'Question'
  },
  {
    name: 'status',
    title: 'Status'
  },
])

onMounted(() => store.fetchSecurityQuestions())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <Table
          :columns="columns"
          :rows="securityQuestions"
      />
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
