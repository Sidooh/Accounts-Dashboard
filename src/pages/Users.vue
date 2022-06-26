<script setup lang="ts">
import {useUsersStore} from "../stores/users";
import {computed, onBeforeMount} from "vue";
import Table from "../components/core/table.vue";

const store = useUsersStore();

const users = computed(() => store.users)
const columns = computed(() => [
  {
    name: 'id',
    title: '#'
  },
  {
    name: 'name',
    title: 'Name'
  },
  {
    name: 'email',
    title: 'Email'
  },
])

onBeforeMount(() => store.fetchUsers())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <Table
          :columns="columns"
          :rows="users"
      />
    </div>
  </div>

</template>