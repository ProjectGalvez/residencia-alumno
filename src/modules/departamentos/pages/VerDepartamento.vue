<script setup lang="ts">
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useVerDepartamento from '../composables/useVerDepartamento';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import CardDepartamento from '../components/CardDepartamento.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id = '' } = route.params;

const { departamento, isLoading } = useVerDepartamento(id + '');

const links: Breadcrumb[] = [
  {
    label: 'Departamentos',
    icon: 'account_balance',
    to: 'listar-departamento',
  },
  { label: 'Ver departamento', icon: 'visibility' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver departamento" />
    <loader-spinner v-if="isLoading" />
    <card-departamento v-else-if="departamento" :departamento="departamento" />
    <div v-else>Ocurrió un error desconocido</div>
  </q-page>
</template>

<style scoped></style>
