<script setup lang="ts">
import {useInvitesStore} from "../stores/invites";
import {computed, onMounted} from "vue";

const store = useInvitesStore();

const invites = computed(() => store.invites)

onMounted(() => store.fetchInvites())
</script>

<template>

  <div>{{invites}}</div>

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
