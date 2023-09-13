<script setup lang="ts">
import { useRoute } from 'vue-router';

import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerCarrera from '../composables/useVerCarrera';
import CardCarrera from '../components/CardCarrera.vue';

const links: Breadcrumb[] = [
  {
    label: 'Carreras',
    icon: 'local_library',
    to: 'listar-carrera',
  },
  { label: 'Ver carrera', icon: 'visibility' },
];

const route = useRoute();
const { id = '' } = route.params;

const { resource: carrera, isLoading, error } = useVerCarrera(id + '');
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver carrera" />
    <LoaderSpinner v-if="isLoading" />
    <CardCarrera v-else-if="carrera" :carrera="carrera" />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
