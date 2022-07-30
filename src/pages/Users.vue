<script setup lang="ts">
import {useUsersStore} from "../stores/users";
import {computed, onMounted} from "vue";
import Table from "../components/core/table.vue";
import {createColumnHelper} from "@tanstack/vue-table";

const store = useUsersStore();

const users = computed((): User[] => store.users)

const columnHelper = createColumnHelper<User>()

// TODO: Finalize this
// const getColumnHelper = (idValue: string, headerValue: string) => {
//   return columnHelper.accessor(idValue as any, {
//     header: headerValue,
//     id: idValue
//   })
// }

const columns = [
  // getColumnHelper('id', 'Id'),
  columnHelper.accessor(row => row.id, {
    header: '#',
    id: 'id'
  }),
  columnHelper.accessor(row => row.name, {
    header: () => 'Name',
    id: 'name'
  }),
  columnHelper.accessor(row => row.email, {
    header: () => 'Email',
    id: 'email'
  }),
  columnHelper.accessor(row => row.username, {
    header: () => 'Username',
    id: 'username'
  }),
  columnHelper.accessor(row => row.status, {
    header: () => 'Status',
    id: 'status'
  }),
]

onMounted(() => store.fetchUsers())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <Table
          title="Users"
          :columns="columns"
          :data="users"
      />
    </div>
  </div>

</template>