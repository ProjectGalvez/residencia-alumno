<script setup lang="ts">
import documentosApi from 'src/api/documentosApi';
import { computed, ref } from 'vue';

interface Proyecto {
  id: number;
  nombre: string;
}

interface ComponentProps {
  modelValue: Proyecto | null;
  label: string;
}
const props = defineProps<ComponentProps>();

const emit = defineEmits<{
  (event: 'update:modelValue', newValue: Proyecto | null): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (newValue: Proyecto | null) => emit('update:modelValue', newValue),
});

const proyectos = ref<Proyecto[]>([]);
const loading = ref(false);
let abortController: AbortController | null = null;

function filterFn(val: string, update: (callback: () => void) => void) {
  if (abortController) {
    abortController.abort();
    abortController = null;
  }

  if (val.length < 3) {
    update(() => {
      proyectos.value = [];
      loading.value = false;
    });
    return;
  }

  loading.value = true;
  abortController = new AbortController();

  setTimeout(async () => {
    try {
      update(async () => {
        const { data } = await documentosApi.get<Proyecto[]>(
          '/proyectos-autocomplete',
          {
            params: {
              q: val,
            },
          }
        );
        proyectos.value = data;
        loading.value = false;
      });
    } catch (error) {
      loading.value = false;
    }
  }, 500);
}
</script>

<template>
  <q-select
    use-input
    :label="label"
    v-model="model"
    :loading="loading"
    option-label="nombre"
    :options="proyectos"
    hint="Escibre 3 o más caracteres para realizar la búsqueda"
    @filter="filterFn"
    emit-value
    map-options
  />
</template>

<style scoped></style>
