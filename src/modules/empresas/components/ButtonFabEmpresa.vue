<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const fabRight = ref(false);
const props = defineProps<{ id: string }>();
const id = toRef(props, 'id');

const asignarResidencia = () => {
  router.push({ name: 'asignar-residencia', params: { id: id.value } });
};
const editar = () => {
  router.push({ name: 'editar-estudiante', params: { id: id.value } });
};
</script>

<template>
  <q-fab
    v-model="fabRight"
    vertical-actions-align="right"
    color="primary"
    glossy
    icon="keyboard_arrow_up"
    direction="up"
  >
    <q-fab-action
      label-position="left"
      color="primary"
      @click="asignarResidencia"
      icon="add_reaction"
      label="Asignar residencia"
    />
    <q-fab-action
      label-position="left"
      color="secondary"
      @click="editar"
      icon="edit"
      label="Editar"
    />
  </q-fab>
</template>

<style scoped></style>
