<template>
    <div class="card mb-3">
        <CardBgCorner :corner="5"/>
        <div class="card-body position-relative">
            <div class="col">
                <h5>User #{{ store.user?.id }}</h5>
                <p class="fs--1">{{ moment(store.user?.created_at).format('MMM Do, YYYY | hh:mm A') }}</p>
                <StatusBadge :status="store.user?.status ?? Status.INACTIVE"/>

                <div class="dropdown position-absolute bottom-0 right-0 px-2 py-1">
                    <font-awesome-icon :icon="faCrosshairs" data-bs-toggle="dropdown" aria-expanded="false"
                                       class="dropdown-toggle fw-bold cursor-pointer bg-warning p-2 rounded-circle"/>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="handlePasswordReset">Reset Password</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="card mb-3">
        <CardBgCorner/>
        <div class="card-body position-relative">
            <div class="row">
                <div class="col-auto">
                    <h6>Name</h6>
                    <h6>Email</h6>
                    <h6>Username</h6>
                    <h6 class="mb-0">Identification Number</h6>
                </div>
                <div class="col">
                    <h6 class="fs--1 fw-bold">
                        : <a :href="`/accounts/${store.user?.id}`">{{ store.user?.name || 'N/A' }}</a>
                    </h6>
                    <h6 class="fs--1 fw-bold">
                        : <a :href="`mailto:${store.user?.email}`">{{ store.user?.email || 'N/A' }}</a>
                    </h6>
                    <h6 class="fs--1 fw-bold">
                        : <a :href="`mailto:${store.user?.username}`">{{ store.user?.username ?? 'N/A' }}</a>
                    </h6>
                    <h6 class="mb-0 fs--1 fw-bold">
                        : <a :href="`mailto:${store.user?.id_number}`">{{ store.user?.id_number ?? 'N/A' }}</a>
                    </h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import CardBgCorner from "@/components/CardBgCorner.vue";
import moment from "moment";
import { useUsersStore } from "@/stores/users";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Swal from "sweetalert2";
import { logger, Status, StatusBadge, toast } from "@nabcellent/sui-vue";

const id = Number(useRoute().params.id)

const store = useUsersStore();

const handlePasswordReset = () => {
    Swal.fire({
        titleText: 'Are you sure?',
        text: 'This users password will be reset!',
        backdrop: `rgba(0, 0, 150, 0.4)`,
        showLoaderOnConfirm: true,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            const res = await store.resetPassword(id);
            logger.log(res);

            if (res) {
                toast({ titleText: 'Password Reset Successful!' })
            } else {
                toast({ titleText: 'Error Resetting Password', icon: 'error', })
            }
        }
    })
}

await store.fetchUser(id)
</script>