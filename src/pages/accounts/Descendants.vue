<template>
    <div v-if="store.descendants.total" class="card mb-3">
        <div class="card-body">
            <h6 class="text-nowrap fw-bold">Descendants</h6>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Ripple</th>
                    <th>Total</th>
                    <th>Accounts</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(level, i) in Object.keys(store.descendants.ripples)">
                    <td>{{ level }}</td>
                    <td>{{ store.descendants.ripples[level].length }}</td>
                    <td>
                        <router-link v-for="(acc, i) in store.descendants.ripples[level]"
                                     :to="{name:'accounts.show',params:{id:acc.id}}">
                            <Badge pill bg="secondary">{{ acc.phone }}</Badge>
                            <font-awesome-icon v-if="i < store.descendants.ripples[level].length -1" class="mx-1"
                                               :icon="faArrowRightLong"/>
                        </router-link>
                    </td>
                </tr>
                </tbody>
                <tfoot class="bg-soft-secondary">
                <tr class="text-end fw-bold">
                    <th colspan="3">TOTAL - {{ store.descendants.total }}</th>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/stores/accounts";
import Badge from "@/components/Badge.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{ accountId: number }>()

const store = useAccountsStore();

await store.fetchDescendants(props.accountId)
</script>