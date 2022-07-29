<script setup lang="ts">
import {useAccountsStore} from "../stores/accounts";
import {computed, onMounted} from "vue";
import Table from "../components/core/table.vue";
import {ColumnDef, createColumnHelper} from "@tanstack/vue-table";

const store = useAccountsStore();

const accounts = computed((): Account[] => store.accounts)

const columnHelper = createColumnHelper<Account>()

const columns: ColumnDef<Account, any>[] = [
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

onMounted(() => store.fetchAccounts())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <Table
          title="Accounts"
          :columns="columns"
          :data="accounts"
      />
    </div>
  </div>

</template>
