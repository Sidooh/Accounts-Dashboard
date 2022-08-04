<script setup lang="ts">
import {useAccountsStore} from "../stores/accounts";
import {computed, onMounted, ref} from "vue";
import Table from "../components/core/table.vue";
import {createColumnHelper} from "@tanstack/vue-table";

const store = useAccountsStore();

const search = ref()

const accounts = computed((): Account[] => {
  if (search.value) {
    const re = new RegExp(search.value);

    const filterFunc = (a: Account) => re.test(a.id.toString()) || re.test(a.phone) || re.test((a.user_id || '').toString())

    return store.accounts.filter(filterFunc)
  }

  return store.accounts
})

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

onMounted(() => store.fetchAccounts())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <div class="my-3 row">
        <div class="col">
          Accounts
        </div>
        <div class="col">
          <input class="search form-control w-50 float-end" v-model="search"/>
        </div>
      </div>
      <Table
          title="Accounts"
          :columns="columns"
          :data="accounts"
      />
    </div>
  </div>

</template>
