<script setup lang="ts">
import {useInvitesStore} from "../stores/invites";
import {computed, onMounted} from "vue";
import Table from "../components/core/table.vue";

const store = useInvitesStore();

const invites = computed(() => store.invites)

const columns = computed(() => [
  {
    name: 'id',
    title: '#'
  },
  {
    name: 'phone',
    title: 'Phone'
  },
  {
    name: 'account_id',
    title: 'Account'
  },
  {
    name: 'inviter_id',
    title: 'Inviter'
  },
  {
    name: 'status',
    title: 'Status'
  },
])

onMounted(() => store.fetchInvites())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <Table
          key="invites"
          :columns="columns"
          :rows="invites"
      />
    </div>
  </div>
</template>