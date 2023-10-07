<script setup lang="ts">
import { useRoute } from 'vue-router';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { Estudiante } from 'src/modules/model/Model';
import useVerEstudiante from '../composables/useVerEstudiante';
import useActualizarEstudiante from '../composables/useActualizarEstudiante';
import FormEstudiante from '../components/FormEstudiante.vue';

const route = useRoute();
const { id = '' } = route.params;

const { resource: estudiante, isLoading, error } = useVerEstudiante(id + '');
const { actalizarRecurso, isLoadingActualizar, errorServer } =
  useActualizarEstudiante();

const guardar = (estudiante: Estudiante) => {
  actalizarRecurso(estudiante);
};
const links: Breadcrumb[] = [
  {
    label: 'Estudiantes',
    icon: 'school',
    to: 'listar-estudiante',
  },
  { label: 'Editar estudiante', icon: 'edit' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar estudiante" />
    <LoaderSpinner v-if="isLoading" />
    <FormEstudiante
      v-else-if="estudiante"
      :estudiante="estudiante"
      :loading="isLoadingActualizar"
      :errorServer="errorServer"
      @guardar="guardar"
    />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
