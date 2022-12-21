<template>
<div class="badge" :class="[{'rounded-pill':pill}, className]" :style="style" @click="onClick">
{{ icon }} <slot/>
</div>
</template>

<script setup lang="ts">
import { CSSProperties, ref } from "vue";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";

const props = defineProps<{
    bg?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'white' | 'muted',
    pill?: boolean,
    className?: string
    style?: CSSProperties;
    soft?: boolean;
    icon?: IconDefinition;
    onClick?: MouseEvent
}>()

const bg = ref(props.bg ?? 'primary')
const soft = ref(props.soft ?? false)
const className = ref((props?.className ?? '') + ` ${soft.value ? 'badge-soft' : 'bg'}-${bg.value}`)
</script>

<style scoped>

</style>