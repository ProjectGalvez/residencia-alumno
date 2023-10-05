<script setup lang="ts">
import { useRoute } from 'vue-router';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { Empresa, Periodo } from 'src/modules/model/Model';
import useVerEmpresa from '../composables/useVerEmpresa';
import useActualizarEmpresa from '../composables/useActualizarEmpresa';
import FormEmpresa from '../components/FormEmpresa.vue';

const route = useRoute();
const { id = '' } = route.params;
const { resource: empresa, isLoading, error } = useVerEmpresa(id + '');
const { actalizarRecurso, isLoadingActualizar, errorServer } =
  useActualizarEmpresa();

const guardar = (empresa: Empresa) => {
  actalizarRecurso(empresa);
};
const links: Breadcrumb[] = [
  {
    label: 'Empresas',
    icon: 'domain',
    to: 'listar-empresa',
  },
  { label: 'Editar empresa', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar periodo" />
    <LoaderSpinner v-if="isLoading" />
    <form-empresa
      v-else-if="empresa"
      :empresa="empresa"
      :loading="isLoadingActualizar"
      :errorServer="errorServer"
      @guardar="guardar"
    />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
