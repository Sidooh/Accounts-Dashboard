<template>
    <div class="card">
        <div class="card-body">
            <InvitesTable :invites="store.invites" title="Recent Invites"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useInvitesStore } from "@/stores/invites";
import InvitesTable from "@/components/tables/InvitesTable.vue";

const store = useInvitesStore();

await store.fetchInvites()
</script>