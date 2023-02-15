<template>
    <div class="card mb-3">
        <CardBgCorner :corner="5"/>
        <div class="card-body position-relative">
            <h5>Account #{{ account.id }}</h5>

            <p class="fs--1">{{ moment(account.created_at).format('MMM Do, YYYY | hh:mm A') }}</p>

            <StatusBadge :key="String(account.active)" :status="account.active ? Status.ACTIVE : Status.INACTIVE"/>

            <div class="dropdown position-absolute bottom-0 right-0 px-2 py-1">
                <font-awesome-icon :icon="faCrosshairs" data-bs-toggle="dropdown" aria-expanded="false"
                                   class="dropdown-toggle fw-bold cursor-pointer bg-warning p-2 rounded-circle"/>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" @click="handlePinReset">Reset Pin</a></li>
                    <li>
                        <hr class="dropdown-divider"/>
                    </li>
                    <li>
                        <a class="dropdown-item" @click="handleAccountActivity" :class="{
                            'text-danger':account.active,
                            'text-success':!account.active
                        }" href="#">
                            <span v-if="account.active">Deactivate</span>
                            <span v-else>Activate</span>
                        </a>
                    </li>
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
                        <a :href="`tel:${account.phone}`">
                            <PhoneNumber :phone="account.phone"/>
                        </a>
                    </h6>
                    <h6 v-if="account.user" class="mb-0 fs--1 fw-bold">
                        <a :href="`mailto:${account.user.email}`">{{ account.user.email }}</a>
                    </h6>
                </div>
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <h5 class="mb-3 fs-0 fw-bold">User</h5>
                    <h6 class="mb-2">
                        <router-link :to="{name:'accounts.show',params:{id:account.id}}">
                            {{ account.user?.name ?? 'N/A' }}
                        </router-link>
                    </h6>
                    <p v-if="account.user?.id_number" class="mb-0 fs--1">
                        <strong>ID Number: </strong>{{ account.user.id_number }}</p>
                </div>

                <div class="col-lg-4">
                    <h5 class="mb-3 fs-0 fw-bold">Inviter</h5>
                    <div v-if="account.inviter_id">
                        <h6 class="mb-2">
                            <router-link :to="{name:'accounts.show',params:{id:account.inviter_id}}">
                                {{ account.inviter.user?.name ?? 'N/A' }}
                            </router-link>
                        </h6>
                        <h6 class="mb-2">
                            <a :href="`tel:${account.inviter.phone}`">
                                <PhoneNumber :phone="account.inviter.phone"/>
                            </a>
                        </h6>
                    </div>
                    <h6 v-else-if="account.invite_code">
                        CODE: <b><code>{{ account.invite_code }}</code></b>
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
import moment from "moment";
import { CardBgCorner, PhoneNumber, Status, StatusBadge, toast } from "@nabcellent/sui-vue";
import Ancestors from "@/pages/accounts/Ancestors.vue";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import Descendants from "@/pages/accounts/Descendants.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { logger } from "@/utils/logger";
import { storeToRefs } from "pinia";

const id = Number(useRoute().params.id)

const store = useAccountsStore();
const { account } = storeToRefs(store)

const queryError = (res: any, titleText: string) => toast({
    titleText,
    text: res?.error?.data?.message || res?.error?.error,
    icon: 'error',
});

const handlePinReset = () => {
    Swal.fire({
        titleText: 'Are you sure?',
        text: 'The account\'s pin will be erased!',
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

const handleAccountActivity = async () => {
    await Swal.fire({
        titleText: 'Are you sure?',
        html: `This account will be
                <span class="text-${store.account.active ? 'danger' : 'success'}">
                    ${account.value.active ? 'DE' : ''}ACTIVATED!
                </span>`,
        backdrop: `rgba(0, 0, 150, 0.4)`,
        showLoaderOnConfirm: true,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            try {
                const status = await store[account.value.active ? 'deactivate' : 'activate'](id)

                if (status) store.fetchAccount(id)

                await toast({ titleText: `Account ${account.value.active ? 'DE' : ''}ACTIVATION Successful!` })
            } catch (err) {
                queryError(err, 'Error Resetting Pin')
            }
        }
    })
}

await store.fetchAccount(id)
</script>