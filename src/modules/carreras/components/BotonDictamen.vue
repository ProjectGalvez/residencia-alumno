<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps<{ carrera_id: number; periodo_id: string }>();
const carrera_id = toRef(props, 'carrera_id');
const periodo_id = toRef(props, 'periodo_id');

const URL = `${process.env.SERVER_URL}`;
const generarDictamen = () => {
  const exportURL =
    URL +
    '/formato-dictamen-anteproyecto/' +
    carrera_id.value +
    '?periodo_id=' +
    periodo_id.value;
  window.open(exportURL, '_blank');
};
</script>
<template>
  <q-btn
    label="Dictamen"
    color="secondary"
    size="sm"
    @click="generarDictamen"
  />
</template>

<style scoped></style>
