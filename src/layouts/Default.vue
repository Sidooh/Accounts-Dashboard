<template>
    <main id="top" class="main">
        <div :class="containerStyle" data-layout="container">
            <!--  Sidebar -->
            <Sidebar v-if="store.navbarPosition === 'vertical' || store.navbarPosition === 'combo'"/>

            <div class="content">
                <!--  Navbar -->
                <Navbar/>

                <!--  Content -->
                <ComponentLoader>
                    <router-view/>
                </ComponentLoader>

                <!--  Footer? -->
                <Footer service-name="Accounts" :version="CONFIG.sidooh.version"/>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import Navbar from "../components/partials/Navbar.vue"
import Sidebar from "../components/partials/Sidebar.vue";
import { computed } from "vue";
import { useCoreStore } from "@/stores/core";
import Footer from "../components/partials/Footer.vue";
import { CONFIG } from "@/config";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";

const store = useCoreStore()

const containerStyle = computed(() => store.isFluid ? 'container-fluid' : 'container')
</script>