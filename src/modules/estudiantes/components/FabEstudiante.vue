<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const fabRight = ref(false);
const props = defineProps<{ id: string; isResidente?: boolean }>();
const id = toRef(props, 'id');

const asignarResidencia = () => {
  router.push({ name: 'asignar-residencia', params: { id: id.value } });
};
const onClick = () => {
  console.log('Goilas');
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
      v-if="!isResidente"
      label-position="left"
      color="primary"
      @click="asignarResidencia"
      icon="add_reaction"
      label="Asignar residencia"
    />
    <q-fab-action
      label-position="left"
      color="secondary"
      @click="onClick"
      icon="edit"
      label="Editar"
    />
    <q-fab-action
      label-position="left"
      color="orange"
      @click="onClick"
      icon="post_add"
      label="Agregar documentos"
    />
  </q-fab>
</template>

<style scoped></style>
