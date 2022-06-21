<script setup lang="ts">
import {useUsersStore} from "../stores/users";
import {computed, onMounted} from "vue";

const store = useUsersStore();

const users = computed(() => store.users)

onMounted(() => store.fetchUsers())
</script>

<template>

  <div>{{users}}</div>

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
