<script setup lang="ts">
import {useAccountsStore} from "../stores/accounts";
import {computed, onMounted} from "vue";
import Table from "../components/core/table.vue";

const store = useAccountsStore();

const accounts = computed(() => store.accounts)

const columns = computed(() => [
  {
    name: 'id',
    Title: '#'
  },
  {
    name: 'phone',
    Title: 'Phone'
  },
  {
    name: 'active',
    Title: 'Active'
  },
])

onMounted(() => store.fetchAccounts())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <Table
          :columns="columns"
          :rows="accounts"
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
