<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import { h, onMounted } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import DataTable from "../../components/datatable/DataTable.vue";
import { Account, User } from "@/utils/types";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

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
    {
        id: 'actions',
        header: '',
        cell: ({ row: { original } }: CellContext<Account, string>) => h('div', { class: 'd-flex justify-content-evenly' }, [
            h(
                RouterLink,
                { to: { name: 'users.show', params: { id: original.id } } },
                () => h(FontAwesomeIcon, { icon: faEye })
            ),
        ])
    },
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