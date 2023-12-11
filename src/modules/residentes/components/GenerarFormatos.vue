<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps<{ id: string }>();
const id = toRef(props, 'id');

const URL = `${process.env.SERVER_URL}`;
const generarCartaAceptacion = () => {
  const exportURL = URL + '/formato-carta-presentacion/' + id.value;
  window.open(exportURL, '_blank');
};
const generarInformeSemestral = () => {
  const exportURL = URL + '/formato-informe-semestral/' + id.value;
  window.open(exportURL, '_blank');
};
const generarRegistroAsesoria = () => {
  const exportURL = URL + '/formato-registro-asesoria/' + id.value;
  window.open(exportURL, '_blank');
};
const solicitudResidencia = () => {
  const exportURL = URL + '/formato-solicitud-residencia/' + id.value;
  window.open(exportURL, '_blank');
};
const asignacionResidencia = () => {
  const exportURL = URL + '/formato-asignacion-residencia/' + id.value;
  window.open(exportURL, '_blank');
};
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="fontsize-14 text-weight-light q-mb-xs">
        Generar formatos de residencia
      </div>
    </q-card-section>
    <q-card-section class="q-gutter-md">
      <q-btn
        color="primary"
        label="Solicitud de residencia profesional"
        @click="solicitudResidencia"
      />
      <q-btn
        color="primary"
        label="Fomato de asignación de asesor interno"
        @click="asignacionResidencia"
      />
      <q-btn
        color="primary"
        label="Carta de presentación y agradecimiento"
        @click="generarCartaAceptacion"
      />
      <q-btn
        color="primary"
        label="Informe semestral"
        @click="generarInformeSemestral"
      />
      <q-btn
        color="primary"
        label="Registro asesoria"
        @click="generarRegistroAsesoria"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
