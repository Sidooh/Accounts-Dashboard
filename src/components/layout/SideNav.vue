<script setup lang="ts">

import {useCoreStore} from "../../stores/core";
import {computed} from "vue";

const store = useCoreStore()

const sideNavStyle = computed(() => store.navbarStyle !== 'transparent' ? `navbar-${store.navbarStyle}` : '')
</script>

<template>
  <nav class="navbar navbar-light navbar-vertical navbar-expand-xl" :class="sideNavStyle">
    <div class="d-flex align-items-center">
      <div class="toggle-icon-wrapper">
        <button class="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip"
                data-bs-placement="left" title="" data-bs-original-title="Toggle Navigation"
                aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span>
        </button>
      </div>
      <a class="navbar-brand" href="/">
        <div class="d-flex align-items-center py-3">
          <!--          <span class="font-sans-serif">A</span>-->
          <img class="ms-2" src="/logo.png" alt="" width="70">
        </div>
      </a>
    </div>

    <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
      <div class="navbar-vertical-content scrollbar">
        <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
          <li class="nav-item">
            <router-link class="nav-link" aria-expanded="false" to="/">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <svg
                      class="svg-inline--fa fa-comments fa-w-18" aria-hidden="true" focusable="false" data-prefix="fas"
                      data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                      data-fa-i2svg="">
                    <path fill="currentColor"
                          d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46
                        65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74
                        408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224
                        288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59
                         243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"></path>
                  </svg>
                </span>
                <span class="nav-link-text ps-1">
                Dashboard
              </span>
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <!-- label-->
            <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
              <div class="col-auto navbar-vertical-label">App</div>
              <div class="col ps-0">
                <hr class="mb-0 navbar-vertical-divider">
              </div>
            </div>
            <router-link class="nav-link" aria-expanded="false" to="users">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <svg
                      class="svg-inline--fa fa-comments fa-w-18" aria-hidden="true" focusable="false" data-prefix="fas"
                      data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                      data-fa-i2svg=""><path fill="currentColor"
                                             d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
                  </span>
                <span class="nav-link-text ps-1">
                Users
              </span>
              </div>
            </router-link>
            <router-link class="nav-link" aria-expanded="false" to="accounts">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <svg
                      class="svg-inline--fa fa-comments fa-w-18" aria-hidden="true" focusable="false" data-prefix="fas"
                      data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                      data-fa-i2svg=""><path fill="currentColor"
                                             d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
                  </span>
                <span class="nav-link-text ps-1">
                Accounts
              </span>
              </div>
            </router-link>
            <router-link class="nav-link" aria-expanded="false" to="invites">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <svg
                      class="svg-inline--fa fa-comments fa-w-18" aria-hidden="true" focusable="false" data-prefix="fas"
                      data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                      data-fa-i2svg=""><path fill="currentColor"
                                             d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
                  </span>
                <span class="nav-link-text ps-1">
                Invites
              </span>
              </div>
            </router-link>
            <router-link class="nav-link" aria-expanded="false" to="security-questions">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <svg
                      class="svg-inline--fa fa-comments fa-w-18" aria-hidden="true" focusable="false" data-prefix="fas"
                      data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                      data-fa-i2svg=""><path fill="currentColor"
                                             d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
                  </span>
                <span class="nav-link-text ps-1">
                Security Questions
              </span>
              </div>
            </router-link>
            <router-link class="nav-link" aria-expanded="false" to="login">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <svg
                      class="svg-inline--fa fa-comments fa-w-18" aria-hidden="true" focusable="false" data-prefix="fas"
                      data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                      data-fa-i2svg=""><path fill="currentColor"
                                             d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
                  </span>
                <span class="nav-link-text ps-1">
                Login
              </span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>