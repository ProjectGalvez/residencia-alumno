<script setup lang="ts">
import { computed } from 'vue';
import useObtenerEmpresas from 'src/modules/empresas/composables/useObtenerEmpresas';

interface ComponentProps {
  modelValue: string | null;
  label: string;
  rules?: ((value: any) => string | boolean)[];
}
const props = defineProps<ComponentProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', newValue: string | null): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (newValue: string | null) => emit('update:modelValue', newValue),
});

const { data: empresas, isLoading } = useObtenerEmpresas();
</script>

<template>
  <q-select
    use-input
    v-model="model"
    :label="props.label"
    :loading="isLoading"
    option-value="id"
    option-label="nombre"
    :options="empresas"
    emit-value
    map-options
    :rules="props.rules"
  />
</template>

<style scoped></style>
