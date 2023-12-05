<script setup lang="ts">
import { computed } from 'vue';
import useObtenerPeriodos from 'src/modules/periodos/composables/useObtenerPeriodos';

interface ComponentProps {
  modelValue: number | null;
  label: string;
  rules?: ((value: any) => string | boolean)[];
}
const props = defineProps<ComponentProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', newValue: number | null): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (newValue: number | null) => emit('update:modelValue', newValue),
});

const { data: periodos, isLoading } = useObtenerPeriodos();
</script>

<template>
  <q-select
    use-input
    v-model="model"
    :label="props.label"
    :loading="isLoading"
    option-value="id"
    option-label="nombre"
    :options="periodos"
    emit-value
    map-options
    :rules="props.rules"
  />
</template>

<style scoped></style>
