<script setup lang="ts">
import { useRoute } from 'vue-router';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerPeriodo from '../composables/useVerPeriodo';
import useActualizarPeriodo from '../composables/useActualizarPeriodo';
import { Periodo } from 'src/modules/model/Model';
import FormPeriodo from '../components/FormPeriodo.vue';

const route = useRoute();
const { id = '' } = route.params;
const { resource: periodo, isLoading, error } = useVerPeriodo(id + '');
const { actalizarRecurso, isLoadingActualizar, errorServer } =
  useActualizarPeriodo();
const guardar = (periodo: Periodo) => {
  actalizarRecurso(periodo);
};

const links: Breadcrumb[] = [
  {
    label: 'Periodos',
    icon: 'date_range',
    to: 'listar-periodo',
  },
  { label: 'Editar periodo', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar periodo" />
    <LoaderSpinner v-if="isLoading" />
    <FormPeriodo
      v-else-if="periodo"
      :periodo="periodo"
      :loading="isLoadingActualizar"
      :errorServer="errorServer"
      @guardar="guardar"
    />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
