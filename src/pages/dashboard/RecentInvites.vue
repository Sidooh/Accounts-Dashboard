<template>
    <InvitesTable :invites="store.invites" title="Recent Invites"/>
</template>

<script setup lang="ts">
import InvitesTable from "@/components/tables/InvitesTable.vue";
import { useDashboardStore } from "@/stores/dashboard";

const store = useDashboardStore();

await store.fetchRecentInvites()
</script>