<script setup lang="ts">
import {useInvitesStore} from "../stores/invites";
import {computed, onMounted, ref} from "vue";
import Table from "../components/core/table.vue";
import {createColumnHelper} from "@tanstack/vue-table";

const store = useInvitesStore();

const search = ref()

const invites = computed((): Invite[] => {
  if (search.value) {
    const re = new RegExp(search.value);

    const filterFunc = (a: Invite) => re.test(a.id.toString()) || re.test(a.phone) || re.test((a.account_id || '').toString())

    return store.invites.filter(filterFunc)
  }

  return store.invites
})

const columnHelper = createColumnHelper<Invite>()

const columns = [
  columnHelper.accessor(row => row.id, {
    header: '#',
    id: 'id'
  }),
  columnHelper.accessor(row => row.phone, {
    header: () => 'Phone',
    id: 'phone'
  }),
  columnHelper.accessor(row => row.status, {
    header: () => 'Status',
    id: 'status'
  }),
  columnHelper.accessor(row => row.inviter_id, {
    header: () => 'Inviter',
    id: 'inviter'
  }),
  columnHelper.accessor(row => row.account_id, {
    header: () => 'Account',
    id: 'account'
  }),
]

onMounted(() => store.fetchInvites())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <div class="my-3 row">
        <div class="col">
          Invites
        </div>
        <div class="col">
          <input class="search form-control w-50 float-end" v-model="search"/>
        </div>
      </div>
      <Table
          title="Invites"
          :columns="columns"
          :data="invites"
      />
    </div>
  </div>
</template>