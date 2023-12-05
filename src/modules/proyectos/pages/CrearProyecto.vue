<script setup lang="ts">
import FormProyecto from '../components/FormProyecto.vue';
import { ref } from 'vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Proyecto } from 'src/modules/model/Model';
import useCrearProyecto from '../composables/useCrearProyecto';

const proyecto = ref<Proyecto>({
  id: 0,
  nombre: '',
  tipo: '',
  carrera_id: null,
});

const { createResource, isLoadingCreate, errorServer } = useCrearProyecto();
const guardar = (proyecto: Proyecto) => {
  createResource(proyecto);
};

const links: Breadcrumb[] = [
  {
    label: 'Proyectos',
    icon: 'engineering',
    to: 'listar-proyecto',
  },
  { label: 'Crear proyecto', icon: 'add_circle_outline' },
];
</script>

<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Registrar proyecto" />
    <FormProyecto
      :proyecto="proyecto"
      :loading="isLoadingCreate"
      :errorServer="errorServer"
      @guardar="guardar"
    />
  </q-page>
</template>

<style scoped></style>
