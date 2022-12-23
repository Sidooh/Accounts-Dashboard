<template>
    <div class="card mb-3">
        <CardBgCorner :corner="5"/>
        <div class="card-body position-relative">
            <div class="row">
                <div class="col">
                    <h5>User #{{ store.user?.id }}</h5>

                    <p class="fs--1">{{ moment(store.user?.created_at).format('MMM Do, YYYY | hh:mm A') }}</p>

                    <StatusBadge :status="store.user?.status"/>
                </div>
                <div class="col">

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import CardBgCorner from "@/components/CardBgCorner.vue";
import moment from "moment";
import StatusBadge from "@/components/StatusBadge.vue";
import { useUsersStore } from "@/stores/users";

const id = Number(useRoute().params.id)

const store = useUsersStore();

await store.fetchUser(id)
</script>