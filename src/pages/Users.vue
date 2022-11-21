<script setup lang="ts">
import {useUsersStore} from "../stores/users";
import {computed, onMounted, ref} from "vue";
import Table from "../components/core/table.vue";
import {createColumnHelper} from "@tanstack/vue-table";

const store = useUsersStore()

const search = ref()

const users = computed((): User[] => {
  if (search.value) {
    const re = new RegExp(search.value);

    const filterFunc = (u: User) => re.test(u.email.toLowerCase()) || re.test(u.name.toLowerCase()) || re.test(u.username.toLowerCase())

    return store.users.filter(filterFunc)
  }

  return store.users
})

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
      <div class="my-3 row">
        <div class="col">
          Users
        </div>
        <div class="col">
          <input class="search form-control w-md-50 w-100 float-end" v-model="search"/>
        </div>
      </div>
      <Table
          title="Users"
          :columns="columns"
          :data="users"
      />
    </div>
  </div>

</template>