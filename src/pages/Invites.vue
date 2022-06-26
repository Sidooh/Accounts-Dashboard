<script setup lang="ts">
import {useInvitesStore} from "../stores/invites";
import {computed, onMounted} from "vue";
import Table from "../components/core/table.vue";

const store = useInvitesStore();

const invites = computed(() => store.invites)

const columns = computed(() => [
  {
    name: 'id',
    Title: '#'
  },
  {
    name: 'phone',
    Title: 'Phone'
  },
  {
    name: 'account_id',
    Title: 'Account'
  },
  {
    name: 'inviter_id',
    Title: 'Inviter'
  },
  {
    name: 'status',
    Title: 'Status'
  },
])

onMounted(() => store.fetchInvites())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <Table
          :columns="columns"
          :rows="invites"
      />
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
