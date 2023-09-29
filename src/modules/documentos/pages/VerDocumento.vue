<script setup lang="ts">
import { useRoute } from 'vue-router';

import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerDocumento from '../composables/useVerDocumento';
import CardDocumento from '../components/CardDocumento.vue';

const links: Breadcrumb[] = [
  {
    label: 'Documentos',
    icon: 'description',
    to: 'listar-documento',
  },
  { label: 'Ver documento', icon: 'visibility' },
];
const route = useRoute();
const { id = '' } = route.params;
const { resource: documento, isLoading, error } = useVerDocumento(id + '');
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver documento" />
    <LoaderSpinner v-if="isLoading" />
    <CardDocumento v-else-if="documento" :documento="documento" />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
