<script setup lang="ts">
import {useSecurityQuestionsStore} from "../stores/securityQuestions";
import {computed, onMounted} from "vue";

const store = useSecurityQuestionsStore();

const securityQuestions = computed(() => store.securityQuestions)

onMounted(() => store.fetchSecurityQuestions())
</script>

<template>

  <div>{{securityQuestions}}</div>

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
