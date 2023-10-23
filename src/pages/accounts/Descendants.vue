<template>
    <div v-if="store.descendants.total" class="card mb-3">
        <div class="card-body">
            <h6 class="text-nowrap fw-bold">Invites</h6>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Ripple</th>
                    <th>Total</th>
                    <th>Accounts</th>
                </tr>
                </thead>
                <tbody>
                <tr :key="`row-${i}`" v-for="(level, i) in Object.keys(store.descendants.ripples)">
                    <td>{{ level }}</td>
                    <td>{{ store.descendants.ripples[Number(level)].length }}</td>
                    <td>
                        <router-link :key="`descendant-${i}`"
                                     v-for="(acc, i) in store.descendants.ripples[Number(level)]"
                                     :to="{name:'accounts.show',params:{id:acc.id}}">
                            <Badge class="me-1" pill bg="secondary">{{ acc.phone }}</Badge>
                        </router-link>
                    </td>
                </tr>
                </tbody>
                <tfoot class="bg-secondary-subtle">
                <tr class="text-end fw-bold">
                    <th colspan="3">TOTAL: {{ store.descendants.total }}</th>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/stores/accounts";
import { Badge } from "@nabcellent/sui-vue";

const props = defineProps<{ accountId: number }>()

const store = useAccountsStore();

await store.fetchDescendants(props.accountId)
</script>