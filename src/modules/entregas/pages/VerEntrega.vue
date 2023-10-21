<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerEntrega from '../composables/useVerEntrega';
import CardEntrega from '../components/CardEntrega.vue';

const route = useRoute();
const { id = '' } = route.params;
const { resource: entrega, isLoading, error } = useVerEntrega(id + '');

const links: Breadcrumb[] = [
  {
    label: 'Entregas',
    icon: 'assignment_turned_in',
    to: 'listar-entrega',
  },
  { label: 'Ver entrega', icon: 'visibility' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver entrega" />
    <LoaderSpinner v-if="isLoading" />
    <CardEntrega v-else-if="entrega" :entrega="entrega" />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
