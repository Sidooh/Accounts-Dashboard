<template>
    <div class="card mb-3">
        <CardBgCorner :corner="5"/>
        <div class="card-body position-relative">
            <h5>Account #{{ store.account.id }}</h5>

            <p class="fs--1">{{ moment(store.account.created_at).format('MMM Do, YYYY hh:mm A') }}</p>

            <StatusBadge :status="store.account.active?Status.ACTIVE:Status.INACTIVE"/>

            <div class="dropdown position-absolute bottom-0 right-0 px-2 py-1">
                <font-awesome-icon :icon="faCrosshairs" data-bs-toggle="dropdown" aria-expanded="false"
                                   class="dropdown-toggle fw-bold cursor-pointer bg-warning p-2 rounded-circle"/>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" @click="handlePinReset">Reset Pin</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="card mb-3">
        <CardBgCorner/>
        <div class="card-body position-relative">
            <div class="row">
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <h5 class="mb-3 fs-0 fw-bold">Account</h5>
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
                    <h5 class="mb-3 fs-0 fw-bold">User</h5>
                    <h6 class="mb-2">
                        <a :href="`/accounts/${store.account.id}`">{{ store.account.user?.name ?? 'N/A' }}</a>
                    </h6>
                    <p v-if="store.account.user?.id_number" class="mb-0 fs--1">
                        <strong>ID Number: </strong>{{ store.account.user.id_number }}</p>
                </div>

                <div class="col-lg-4">
                    <h5 class="mb-3 fs-0 fw-bold">Inviter</h5>
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

    <ComponentLoader>
        <Ancestors :account-id="id"/>
    </ComponentLoader>
    <ComponentLoader>
        <Descendants :account-id="id"/>
    </ComponentLoader>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { toast } from "@/utils/helpers";
import { logger } from "@/utils/logger";

const id = Number(useRoute().params.id)

const store = useAccountsStore();

const queryError = (res: any, titleText: string) => toast({
    titleText,
    text: res?.error?.data?.message || res?.error?.error,
    icon: 'error',
});

const handlePinReset = () => {
    Swal.fire({
        titleText: 'Are you sure?',
        text: 'The accounts pin will be erased!',
        backdrop: `rgba(0, 0, 150, 0.4)`,
        showLoaderOnConfirm: true,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const res = await store.resetPin(id);
            logger.log(res);

            if (res) {
                toast({ titleText: 'Pin Reset Successful!' })
            } else {
                queryError(res, 'Error Resetting Pin')
            }
        }
    })
}

await store.fetchAccount(id)
</script>