<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps<{ id: string }>();
const id = toRef(props, 'id');

const URL = `${process.env.SERVER_URL}`;
const generarCartaAceptacion = () => {
  const exportURL = URL + '/formato-carta-presentacion/' + id.value;
  window.open(exportURL, '_blank');
};
</script>

<template>
  <q-card>
    <q-card-section>
      <q-btn
        color="primary"
        label="Carta de presentación y agradecimiento"
        @click="generarCartaAceptacion"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
