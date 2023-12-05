<script setup lang="ts">
import FormAsesor from '../components/FormAsesor.vue';
import { useRoute } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerAsesor from '../composables/useVerAsesor';
import useActualizarAsesor from '../composables/useActualizarAsesor';
import { Asesor } from 'src/modules/model/Model';

const route = useRoute();
const { id = '' } = route.params;
const { resource: asesor, isLoading, error } = useVerAsesor(id + '');
const { actalizarRecurso, isLoadingActualizar, errorServer } =
  useActualizarAsesor();
const guardar = (asesor: Asesor) => {
  actalizarRecurso(asesor);
};

const links: Breadcrumb[] = [
  {
    label: 'Asesores',
    icon: 'supervisor_account',
    to: 'listar-asesor',
  },
  { label: 'Editar asesor', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar asesor" />
    <LoaderSpinner v-if="isLoading" />
    <FormAsesor
      v-else-if="asesor"
      :asesor="asesor"
      :loading="isLoadingActualizar"
      :errorServer="errorServer"
      @guardar="guardar"
    />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
