<template>
    <div class="card mb-3">
        <CardBgCorner :corner="5"/>
        <div class="card-body">
            <h5>Account #{{ store.account.id }}</h5>

            <p class="fs--1">{{ moment(store.account.created_at).format('MMM Do, YYYY @hh:mm A') }}</p>

            <StatusBadge :status="store.account.active?Status.ACTIVE:Status.INACTIVE"/>
        </div>
    </div>

    <div class="card mb-3">
        <CardBgCorner/>
        <div class="card-body position-relative">
            <div class="row">
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <h5 class="fs-0 fw-bold">Account</h5>
                    <hr class="mt-0 mb-3">
                    <h6 class="mb-2">
                        <a :href="`tel:${store.account.phone}`">
                            <Phone :phone="store.account.phone"/>
                        </a>
                    </h6>
                    <h6 v-if="store.account.user" class="mb-0 fs--1 fw-bold">
                        <a :href="`mailto:${store.account.user.email}`">{{ store.account.user.email }}</a>
                    </h6>
                </div>
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <h5 class="fs-0 fw-bold">User</h5>
                    <hr class="mt-0 mb-3">
                    <h6 class="mb-2">
                        <a :href="`/accounts/${store.account.id}`">{{ store.account.user?.name ?? 'N/A' }}</a>
                    </h6>
                    <p v-if="store.account.user?.id_number" class="mb-0 fs--1">
                        <strong>ID Number: </strong>{{ store.account.user.id_number }}</p>
                </div>

                <div class="col-lg-4">
                    <h5 class="fs-0 fw-bold">Inviter</h5>
                    <hr class="mt-0 mb-3">
                    <div v-if="store.account.inviter_id">
                        <h6 class="mb-2">
                            <router-link :to="{name:'accounts.show', params:{id:store.account.inviter_id}}">
                                {{ store.account.inviter.user?.name ?? 'N/A' }}
                            </router-link>
                        </h6>
                        <h6 class="mb-2">
                            <a :href="`tel:${store.account.inviter.phone}`">
                                <Phone :phone="store.account.inviter.phone"/>
                            </a>
                        </h6>
                    </div>
                    <h6 v-else-if="store.account.invite_code">
                        CODE: <b><code>{{ store.account.invite_code }}</code></b>
                    </h6>
                    <div v-else class="d-flex">
                        <p class="mb-0 fs--1"><strong>Root-level User</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ComponentLoader><Ancestors :account-id="id"/></ComponentLoader>
    <ComponentLoader><Descendants :account-id="id"/></ComponentLoader>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/stores/accounts";
import { useRoute } from "vue-router";
import CardBgCorner from "@/components/CardBgCorner.vue";
import moment from "moment";
import StatusBadge from "@/components/StatusBadge.vue";
import { Status } from "@/utils/enums";
import Phone from "@/components/Phone.vue";
import Ancestors from "@/pages/accounts/Ancestors.vue";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import Descendants from "@/pages/accounts/Descendants.vue";

const id = Number(useRoute().params.id)

const store = useAccountsStore();

await store.fetchAccount(id)
</script>