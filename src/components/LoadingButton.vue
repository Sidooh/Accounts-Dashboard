<template>
    <button
        :class="{
      'vue-loading-button': true,
      'loading': loading,
    }"
        :disabled="loading"
        type="button"
    >
        <slot>Submit</slot>
        <span class="spinner">
            <span></span><span></span>
            <span></span><span></span>
        </span>
    </button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{ loading?: boolean }>()
const loading = ref(props.loading ?? false)
</script>

<style scoped>
/* reset */
button {
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
}

button::-moz-focus-inner {
    border-style: none;
    padding: 0;
}

button:-moz-focusring {
    outline: 1px dotted ButtonText;
}

/* loading styles */
button {
    position: relative;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    transition-timing-function: ease-in;
}

.spinner {
    position: absolute;
    top: 50%;
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    right: 1rem;
    margin: -0.5em;
    opacity: 0;
    transition-property: padding, opacity;
    transition-duration: 0.2s, 0.2s;
    transition-timing-function: ease-in, ease;
    transition-delay: 0s, 0.2s;
}

.spinner span {
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    right: 0;
    top: -0.15rem;
    /*width: 1rem;*/
    height: 1rem;
    opacity: 1;
    border: 3px solid;
    border-radius: 50%;
    animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #888 transparent transparent transparent;
}

.spinner span:nth-child(1) {
    animation-delay: 0.45s;
}

.spinner span:nth-child(2) {
    animation-delay: 0.3s;
}

.spinner span:nth-child(3) {
    animation-delay: 0.15s;
}

.loading {
    padding-right: 3rem !important;
}

.loading .spinner {
    opacity: 1;
}

.loading .spinner span {
    opacity: 1;
}

button:not(:disabled) {
    transition-delay: 0.2s;
}

button:not(:disabled) .spinner span {
    box-shadow: 0 0 0 0.2rem #888 inset;
    border: 7.4px solid transparent;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
}

button:not(:disabled) .spinner span:nth-child(1) {
    transform: rotate(0deg) !important;
}

button:not(:disabled) .spinner span:nth-child(2) {
    transform: rotate(90deg) !important;
}

button:not(:disabled) .spinner span:nth-child(3) {
    transform: rotate(180deg) !important;
}

button:not(:disabled) .spinner span:nth-child(4) {
    transform: rotate(270deg) !important;
}

@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>