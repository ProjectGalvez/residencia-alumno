<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ modelValue: string }>();

const emit = defineEmits<{
  (event: 'update:modelValue', newValue: string): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit('update:modelValue', newValue),
});

const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
</script>

<template>
  <q-select v-model="model" :options="options" />
</template>

<style scoped></style>
