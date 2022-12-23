<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import { h, onMounted } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import DataTable from "../../components/datatable/DataTable.vue";
import { Account, User } from "@/utils/types";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import StatusBadge from "@/components/StatusBadge.vue";
import { Status } from "@/utils/enums";

const store = useUsersStore()

const columnHelper = createColumnHelper<User>()
const columns = [
    columnHelper.accessor('id', {
        header: '#',
    }),
    columnHelper.accessor('name', {
        header: 'Name',
    }),
    columnHelper.accessor('email', {
        header: 'Email',
    }),
    columnHelper.accessor('username', {
        header: 'Username',
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => h(StatusBadge, { status: info.getValue() })
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