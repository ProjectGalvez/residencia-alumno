<script setup lang="ts">
import { computed, ref } from 'vue';
import documentosApi from 'src/api/documentosApi';

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
let areasEmpresas = ref();
const loading = ref(false);
const obtenerEmpresas = async () => {
  loading.value = true;
  const { data } = await documentosApi.get('/areas-empresas-nombre');
  areasEmpresas.value = data;
  loading.value = false;
};
obtenerEmpresas();
</script>

<template>
  <q-select
    use-input
    v-model="model"
    :label="props.label"
    :loading="loading"
    option-value="id"
    option-label="nombre"
    :options="areasEmpresas"
    emit-value
    map-options
    :rules="props.rules"
  />
</template>

<style scoped></style>
