<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerEmpresa from '../composables/useVerEmpresa';
import CardEmpresa from '../components/CardEmpresa.vue';

const route = useRoute();
const { id = '' } = route.params;
const { resource: empresa, isLoading, error } = useVerEmpresa(id + '');
const links: Breadcrumb[] = [
  { label: 'Empresas', icon: 'domain', to: 'listar-empresa' },
  { label: 'Ver empres', icon: 'visibility' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver empresa" />
    <LoaderSpinner v-if="isLoading" />
    <card-empresa v-else-if="empresa" :empresa="empresa" />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
