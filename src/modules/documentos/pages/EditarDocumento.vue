<script setup lang="ts">
import { useRoute } from 'vue-router';
import useVerDocumento from '../composables/useVerDocumento';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useActualizarDocumento from '../composables/useActualizarDocumento';
import FormDocumento from '../components/FormDocumento.vue';

const route = useRoute();
const { id = '' } = route.params;

const { resource: documento, isLoading, error } = useVerDocumento(id + '');
const { actalizarRecurso, isLoadingActualizar, errorServer } =
  useActualizarDocumento();

const guardar = (documento: FormData) => {
  actalizarRecurso(documento);
};

const links: Breadcrumb[] = [
  {
    label: 'Documentos',
    icon: 'description',
    to: 'listar-documento',
  },
  { label: 'Editar carrera', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar documento" />
    <LoaderSpinner v-if="isLoading" />
    <FormDocumento
      v-else-if="documento"
      :documento="documento"
      :loading="isLoadingActualizar"
      :errorServer="errorServer"
      @guardar="guardar"
    />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
