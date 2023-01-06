<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import router from "../../router";
import Logo from "../../components/Logo.vue";
import { toast } from "@/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { ref } from "vue";

const isLoading = ref(false)

const submit = async (formData: FormKitGroupValue, node: FormKitNode) => {
    isLoading.value = true

    try {
        const data = formData as { email: string, password: string }

        await useAuthStore().authenticate(data.email, data.password)

        router.push('/')
    } catch (err: any) {
        isLoading.value = false

        toast({ titleText: err.message, icon: 'warning' })

        if (node) node.props.disabled = false
    }
}
</script>

<template>
    <div class="row flex-center min-vh-100 pb-6">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 position-relative">
            <Logo src="/logo.png" :width="120" service-name="Accounts"/>
            <img class="bg-auth-circle-shape" src="/images/icons/spot-illustrations/bg-shape.png" alt="" width="250">
            <img class="bg-auth-circle-shape-2" src="/images/icons/spot-illustrations/shape-1.png" alt="" width="150">
            <div class="card">
                <div class="card-body p-4 p-sm-5">
                    <div class="row flex-between-center mb-2">
                        <div class="col-auto">
                            <h5>Sign In</h5>
                        </div>
                    </div>
                    <FormKit id="sign-in" type="form" :actions="false" @submit="submit"
                             #default="{ value, state: { valid } }">
                        <FormKit class="form-control" type="email" name="email" placeholder="Email address"
                                 :config="{classes:{input:'form-control', outer:'mb-3'}}" validation="required"/>
                        <FormKit class="form-control" type="password" name="password" placeholder="Password"
                                 :config="{classes:{input:'form-control', outer:'mb-3'}}" validation="required"/>
                        <div class="d-flex justify-content-end">
                            <a class="fs--1" href="/password/reset">Forgot Password?</a>
                        </div>
                        <FormKit type="submit" input-class="w-100 btn btn-sm btn-primary mt-3" :disabled="!valid || isLoading">
                            Sign In
                            <font-awesome-icon :icon="faKey"/>
                        </FormKit>
                    </FormKit>
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

