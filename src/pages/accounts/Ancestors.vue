<template>
    <div v-if="store.ancestors.length" class="card mb-3">
        <CardBgCorner :corner="2"/>
        <div class="card-body position-relative">
            <h6 class="text-nowrap fw-bold">Inviters</h6>

            <Badge class="me-1" pill bg="primary">{{ store.account.phone }}</Badge>
            <font-awesome-icon class="mx-1 text-primary" :icon="faArrowLeftLong"/>
            <router-link :key="$route.fullPath" v-for="(acc, i) in store.ancestors"
                         :to="{name:'accounts.show',params:{id:acc.id}}">
                <Badge class="me-1" pill bg="secondary">{{ acc.phone }}</Badge>
                <font-awesome-icon v-if="i < store.ancestors.length - 1" class="mx-1 text-warning"
                                   :icon="faArrowLeftLong"/>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/stores/accounts";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Badge, CardBgCorner } from "@nabcellent/sui-vue";

const props = defineProps<{ accountId: number }>()

const store = useAccountsStore();

await store.fetchAncestors(props.accountId)
</script>