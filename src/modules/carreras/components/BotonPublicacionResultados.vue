<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps<{ carrera_id: number; periodo_id: string }>();
const carrera_id = toRef(props, 'carrera_id');
const periodo_id = toRef(props, 'periodo_id');

const URL = `${process.env.SERVER_URL}`;
const generarResultados = () => {
  const exportURL =
    URL +
    '/formato-publicacion-resultados/' +
    carrera_id.value +
    '?periodo_id=' +
    periodo_id.value;
  window.open(exportURL, '_blank');
};
</script>
<template>
  <q-btn
    label="Publicación de resultados"
    color="info"
    size="sm"
    @click="generarResultados"
  />
</template>

<style scoped></style>
