<script setup lang="ts">
import {computed} from "vue";
import {createColumnHelper} from "@tanstack/vue-table";

const accounts = computed((): Account[] => [
  {
    id: 1,
    phone: '1',
    active: true,
    inviter_id: 1,
    user_id: 1
  },
  {
    id: 2,
    phone: '2',
    active: false,
    inviter_id: 2,
    user_id: 2
  },
])

const columnHelper = createColumnHelper<Account>()

const columns = [
  columnHelper.accessor(row => row.id, {
    header: '#',
    id: 'id'
  }),
  columnHelper.accessor(row => row.phone, {
    header: () => 'Phone',
    id: 'phone'
  }),
  columnHelper.accessor(row => row.active, {
    header: () => 'Active',
    id: 'active'
  }),
  columnHelper.accessor(row => row.inviter_id, {
    header: () => 'Inviter',
    id: 'inviter'
  }),
  columnHelper.accessor(row => row.user_id, {
    header: () => 'User',
    id: 'user'
  }),
]


</script>

<template>

  <div>
    Home!!!!

    <!--    <Datatable-->
    <!--        title="Test"-->
    <!--        :columns="columns"-->
    <!--        :data="accounts"-->
    <!--    />-->
  </div>

</template>
