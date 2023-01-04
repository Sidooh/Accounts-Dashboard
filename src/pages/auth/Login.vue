<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "../../router";
import Logo from "../../components/Logo.vue";
import { toast } from "@/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "@/components/LoadingButton.vue";

const email = ref()
const password = ref()

const emailError = ref(false)
const isLoading = ref(false)
const passwordError = ref(false)
const invalidCredentials = ref(false)

const isEmailValid = (email: string) => {
    const emailRegex = /^[A-z\d]+@[A-z]+(\.[A-z]+)+$/;
    return email && email.toLowerCase().match(emailRegex)
}

const isPasswordValid = (password: string) => password && password.length >= 8

const submit = (e: Event) => {
    // Perform validation
    if (email.value && password.value) e.preventDefault()

    emailError.value = !isEmailValid(email.value)
    passwordError.value = !isPasswordValid(password.value)

    if (!emailError.value && !passwordError.value) {
        isLoading.value = true
        const authStore = useAuthStore()

        authStore
            .authenticate(email.value, password.value)
            .then(() => router.push('/'))
            .catch(error => toast({ titleText: error.message, icon: 'warning' }))
            .finally(() => isLoading.value = false)
    }
}
</script>

<template>
    <div class="row flex-center min-vh-100 pb-6">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 position-relative">
            <Logo src="/logo.png" :width="120" service-name="Accounts"/>
            <img class="bg-auth-circle-shape"
                 src="/images/icons/spot-illustrations/bg-shape.png"
                 alt="" width="250">
            <img class="bg-auth-circle-shape-2"
                 src="/images/icons/spot-illustrations/shape-1.png"
                 alt="" width="150">
            <div class="card">
                <div class="card-body p-4 p-sm-5">
                    <div class="row flex-between-center mb-2">
                        <div class="col-auto">
                            <h5>Sign In</h5>
                        </div>
                    </div>
                    <form id="sign-in">
                        <div class="mb-3">
                            <input class="form-control" type="email" placeholder="Email address" aria-label="" required
                                   v-model="email">
                            <small class="text-danger" v-show="emailError">Email is invalid</small>
                        </div>
                        <div class="mb-3">
                            <input class="form-control" type="password" placeholder="Password" aria-label="" required
                                   v-model="password">
                            <small class="text-danger"
                                  v-show="passwordError">Min password length: 8</small>
                        </div>
                        <div class="row flex-between-center">
                            <div class="col-auto">
                                <small class="text-danger" v-show="invalidCredentials">Invalid Credentials</small>
                            </div>
                            <div class="col-auto">
                                <a class="fs--1" href="/password/reset">Forgot Password?</a>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center mt-3">
                            <LoadingButton type="submit" class="col btn btn-sm btn-primary" @click="submit"
                                           :loading="isLoading">
                                Sign In
                                <font-awesome-icon :icon="faKey"/>
                            </LoadingButton>
                        </div>
                    </form>
                    <div class="position-relative mt-4">
                        <hr class="bg-300">
                        <div class="divider-content-center">🌟</div>
                    </div>
                    <div class="text-center">
                        <i>
                            <small class="opacity-75">Sidooh, Makes You Money with Every Purchase!</small>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

