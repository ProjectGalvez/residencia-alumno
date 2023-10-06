<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useVerCarrera from '../composables/useVerCarrera';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useActualizarCarrera from '../composables/useActualizarCarrera';
import FormCarrera from '../components/FormCarrera.vue';

const route = useRoute();
const router = useRouter();
const { id = '' } = route.params;

const { resource: carrera, isLoading, error } = useVerCarrera(id + '');
const { actalizarRecurso, isLoadingActualizar, isSuccess, errorServer } =
  useActualizarCarrera();

const guardar = (carrera: FormData) => {
  actalizarRecurso(carrera);
};
const links: Breadcrumb[] = [
  {
    label: 'Carreras',
    icon: 'local_library',
    to: 'listar-carrera',
  },
  { label: 'Editar carrera', icon: 'edit' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar carrera" />
    <LoaderSpinner v-if="isLoading" />
    <FormCarrera
      v-else-if="carrera"
      :carrera="carrera"
      :loading="isLoadingActualizar"
      :errorServer="errorServer"
      @guardar="guardar"
    />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
