<script setup lang="ts">
import { useCoreStore } from "../../stores/core";
import { computed } from "vue";
import Waffle from 'components/Waffle.vue'
import { CONFIG } from "../../config";

const store = useCoreStore()

const waffleLinks = [
    {
        avatarText: 'E',
        title: 'Enterprise',
        link: `/events/event-detail`,
        contentClass: 'bg-soft-primary text-primary',
    },
    {
        avatarText: 'N',
        title: 'Notify',
        link: CONFIG.sidooh.services.notify.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'p',
        title: 'Payments',
        link: CONFIG.sidooh.services.payments.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'P',
        title: 'Products',
        link: CONFIG.sidooh.services.products.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'S',
        title: 'Savings',
        link: CONFIG.sidooh.services.savings.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'U',
        title: 'USSD',
        link: CONFIG.sidooh.services.ussd.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
]

const theme = computed(() => store.theme)
</script>

<template>
    <nav class="navbar navbar-light navbar-glass navbar-top navbar-expand">
        <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse"
                aria-controls="navbarVerticalCollapse"
                aria-expanded="false" aria-label="Toggle Navigation">
              <span class="navbar-toggle-icon">
                <span class="toggle-line"></span>
              </span>
        </button>
        <a class="navbar-brand me-1 me-sm-3" href="/">
            <div class="d-flex align-items-center">
                <img class="me-2" src="/logo.png" alt="" width="40">
                <span class="font-sans-serif">A</span>
            </div>
        </a>
        <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
            <Waffle :links="waffleLinks"/>
            <li class="nav-item dropdown">
                <a class="nav-link pe-0 ps-2 d-flex align-items-center" id="navbarDropdownUser" role="button"
                   data-bs-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                    <div class="avatar avatar-2xl">
                        <div class="avatar-name rounded-circle fs-2 bg-soft-primary text-primary"><span>A</span></div>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
                    <div class="bg-white dark__bg-1000 rounded-2 py-2">
                        <h6 class="dropdown-header fw-bold text-warning py-1">
                            <i class="fas fa-crown me-1"/>
                            <span>SIDOOH</span>
                        </h6>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#!">Set status</a>
                        <a class="dropdown-item" href="">Profile &amp; account</a>
                        <a class="dropdown-item" href="#!">Feedback</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="">Settings</a>
                        <a class="dropdown-item" href="/login">Logout</a>
                    </div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<style scoped>

</style>