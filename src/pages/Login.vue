<script setup lang="ts">
</script>

<template>

  <div class="row flex-center min-vh-100 py-6">
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 position-relative">
      <a class="d-flex flex-center mb-4" href="https://sidooh-admin-dashboard-iw4itjwa5a-uc.a.run.app">
        <img class="me-2" src="https://sidooh-admin-dashboard-iw4itjwa5a-uc.a.run.app/images/logo.png" alt="" width="100">
      </a>
      <img class="bg-auth-circle-shape" src="https://sidooh-admin-dashboard-iw4itjwa5a-uc.a.run.app/images/icons/spot-illustrations/bg-shape.png" alt="" width="250">
      <img class="bg-auth-circle-shape-2" src="https://sidooh-admin-dashboard-iw4itjwa5a-uc.a.run.app/images/icons/spot-illustrations/shape-1.png" alt="" width="150">
      <div class="card">
        <div class="card-body p-4 p-sm-5">
          <div class="row flex-between-center mb-2">
            <div class="col-auto">
              <h5>Sign In</h5>
            </div>
          </div>
          <form id="sign-in" novalidate>
            <div class="mb-3">
              <input class="form-control" type="email" name="email" value="" placeholder="Email address" aria-label="" required>
            </div>
            <div class="mb-3">
              <input class="form-control" type="password" name="password" placeholder="Password" aria-label="" required>
            </div>
            <div class="row flex-between-center">
              <div class="col-auto">
                <div class="form-check mb-0">
                  <input class="form-check-input" type="checkbox" id="basic-checkbox" checked>
                  <label class="form-check-label mb-0" for="basic-checkbox">Remember me</label></div>
              </div>
              <div class="col-auto">
                <a class="fs--1" href="https://sidooh-admin-dashboard-iw4itjwa5a-uc.a.run.app/password/reset">Forgot Password?</a>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <button type="submit" class="col btn btn-sm btn-primary ld-ext-right">
                Sign In <svg class="svg-inline--fa fa-key fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"></path></svg><!-- <i class="fas fa-key"></i> Font Awesome fontawesome.com --><span class="ld ld-ring ld-spin"></span>
              </button>
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

<style scoped>
</style>
