<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useVerDepartamento from '../composables/useVerDepartamento';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FormDepartamento from '../components/FormDepartamento.vue';
import useActualizarDepartamento from '../composables/useActualizarDepartamento';
import { Departamento } from 'src/modules/model/Model';

const route = useRoute();
const { id = '' } = route.params;
const router = useRouter();

const { departamento, isLoading } = useVerDepartamento(id + '');

const {
  actualizarDepartamento,
  isLoadingMutate,
  error,
  errorServer,
  isSuccess,
} = useActualizarDepartamento();
const guardar = (depto: Departamento) => {
  actualizarDepartamento(depto);
  if (isSuccess) {
    router.push({ name: 'listar-departamento' });
  }
};

const links: Breadcrumb[] = [
  {
    label: 'Departamentos',
    icon: 'account_balance',
    to: 'listar-departamento',
  },
  { label: 'Editar departamento', icon: 'edit' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar departamento" />
    <loader-spinner v-if="isLoading" />

    <form-departamento
      v-else-if="departamento"
      :departamento="departamento"
      @guardar="guardar"
      :loading="isLoadingMutate"
      :error="error"
      :errorServer="errorServer"
    />
    <div v-else>Ocurrió un error al cargar</div>
  </q-page>
</template>

<style scoped></style>
