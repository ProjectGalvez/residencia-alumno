<script setup lang="ts">
import FormProyecto from '../components/FormProyecto.vue';
import { useRoute } from 'vue-router';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerProyecto from '../composables/useVerProyecto';
import useActualizarProyecto from '../composables/useActualizarProyecto';
import { Proyecto } from 'src/modules/model/Model';

const route = useRoute();
const { id = '' } = route.params;
const { resource: proyecto, isLoading, error } = useVerProyecto(id + '');
const { actalizarRecurso, isLoadingActualizar, errorServer } =
  useActualizarProyecto();
const guardar = (proyecto: Proyecto) => {
  actalizarRecurso(proyecto);
};

const links: Breadcrumb[] = [
  { label: 'Proyectos', icon: 'engineering', to: 'listar-proyecto' },
  { label: 'Editar proyecto', icon: 'edit' },
];
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Editar proyecto" />
    <LoaderSpinner v-if="isLoading" />
    <FormProyecto
      v-else-if="proyecto"
      :proyecto="proyecto"
      :loading="isLoadingActualizar"
      :errorServer="errorServer"
      @guardar="guardar"
    />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
