<script setup lang="ts">
import documentosApi from 'src/api/documentosApi';
import { computed, ref } from 'vue';

interface Asesor {
  id: number;
  nombre_completo: string;
}
interface ComponentProps {
  modelValue: number | null;
  label: string;
}
const props = defineProps<ComponentProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', newValue: number | null): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (newValue: number | null) => emit('update:modelValue', newValue),
});

const asesores = ref<Asesor[]>([]);
const loading = ref(false);
let abortController: AbortController | null = null;

function filterFn(val: string, update: (callback: () => void) => void) {
  if (abortController) {
    abortController.abort();
    abortController = null;
  }

  if (val.length < 3) {
    update(() => {
      asesores.value = [];
      loading.value = false;
    });
    return;
  }

  loading.value = true;
  abortController = new AbortController();

  setTimeout(async () => {
    try {
      update(async () => {
        const { data } = await documentosApi.get<Asesor[]>(
          '/asesores-autocomplete',
          {
            params: {
              q: val,
            },
          }
        );
        asesores.value = data;
        loading.value = false;
      });
    } catch (error) {
      loading.value = false;
    }
  }, 0);
}
</script>

<template>
  <q-select
    use-input
    v-model="model"
    :label="props.label"
    :loading="loading"
    option-value="id"
    option-label="nombre_completo"
    :options="asesores"
    hint="Escribe 3 o más caracteres para realizar la búsqueda"
    @filter="filterFn"
    emit-value
    map-options
  />
</template>

<style scoped></style>
