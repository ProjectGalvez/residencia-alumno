<script setup lang="ts">
import { useRoute } from 'vue-router';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerEntrega from '../composables/useVerEntrega';
import useActualizarEntrega from '../composables/useActualizarEntrega';
import FormEntrega from '../components/FormEntrega.vue';

const route = useRoute();
const { id = '' } = route.params;

const { resource: entrega, isLoading, error } = useVerEntrega(id + '');
const { actalizarRecurso, isLoadingActualizar, errorServer } =
  useActualizarEntrega();
const guardar = (entrega: FormData) => {
  actalizarRecurso(entrega);
};

const links: Breadcrumb[] = [
  {
    label: 'Entregas',
    icon: 'assignment_turned_in',
    to: 'listar-entrega',
  },
  { label: 'Editar entrega', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar entrega" />
    <LoaderSpinner v-if="isLoading" />
    <FormEntrega
      v-else-if="entrega"
      :entrega="entrega"
      :loading="isLoadingActualizar"
      :errorServer="errorServer"
      @guardar="guardar"
    />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
