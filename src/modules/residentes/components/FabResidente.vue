<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ id: string }>();
const id = toRef(props, 'id');

const router = useRouter();
const asignarDocumento = () => {
  router.push({
    name: 'asignar-documento-residente',
    params: { id: id.value },
  });
};
const editar = () => {
  router.push({ name: 'editar-residente', params: { id: id.value } });
};
const fabRight = ref(false);
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
      color="secondary"
      @click="editar"
      icon="edit"
      label="Editar"
    />
    <q-fab-action
      label-position="left"
      color="orange"
      @click="asignarDocumento"
      icon="post_add"
      label="Agregar documentos"
    />
  </q-fab>
</template>

<style lang="scss" scoped></style>
