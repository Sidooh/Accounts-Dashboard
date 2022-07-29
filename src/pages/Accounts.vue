<script setup lang="ts">
import {useAccountsStore} from "../stores/accounts";
import {computed, onMounted} from "vue";
import Table from "../components/core/table.vue";

const store = useAccountsStore();

const accounts = computed(() => store.accounts)

const columns = computed(() => [
  {
    name: 'id',
    title: '#'
  },
  {
    name: 'phone',
    title: 'Phone'
  },
  {
    name: 'active',
    title: 'Active'
  },
])

onMounted(() => store.fetchAccounts())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <Table
          key="accounts"
          :columns="columns"
          :rows="accounts"
      />
    </div>
  </div>

</template>
