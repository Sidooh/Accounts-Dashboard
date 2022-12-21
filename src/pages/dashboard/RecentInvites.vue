<template>
    <InvitesTable :invites="store.invites" title="Recent Invites"/>
</template>

<script setup lang="ts">
import { useInvitesStore } from "@/stores/invites";
import InvitesTable from "@/components/tables/InvitesTable.vue";

const store = useInvitesStore();

await store.fetchInvites()
</script>