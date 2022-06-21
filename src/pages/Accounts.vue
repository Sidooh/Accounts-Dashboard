<script setup lang="ts">
import {useAccountsStore} from "../stores/accounts";
import {computed, onMounted} from "vue";

const store = useAccountsStore();

const accounts = computed(() => store.accounts)

onMounted(() => store.fetchAccounts())
</script>

<template>

  <div>{{accounts}}</div>

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
