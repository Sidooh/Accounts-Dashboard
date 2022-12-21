<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import { onMounted } from "vue";
import { createColumnHelper } from "@tanstack/vue-table";
import DataTable from "../../components/datatable/DataTable.vue";
import { User } from "@/utils/types";

const store = useUsersStore()

const columnHelper = createColumnHelper<User>()
const columns = [
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
            <DataTable title="Users" :columns="columns" :data="store.users"/>
        </div>
    </div>
</template>