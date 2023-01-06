<template>
    <InvitesTable :invites="store.invites"/>
</template>

<script setup lang="ts">
import InvitesTable from "@/components/tables/InvitesTable.vue";
import { useInvitesStore } from "@/stores/invites";

const store = useInvitesStore();

await store.fetchInvites()
</script>

<style scoped>

</style>