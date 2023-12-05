<script setup lang="ts">
import CardProyecto from '../components/CardProyecto.vue';
import { useRoute } from 'vue-router';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerProyecto from '../composables/useVerProyecto';

const route = useRoute();
const { id = '' } = route.params;
const { resource: proyecto, isLoading, error } = useVerProyecto(id + '');

const links: Breadcrumb[] = [
  { label: 'Proyectos', icon: 'engineering', to: 'listar-proyecto' },
  { label: 'Ver proyecto', icon: 'visibility' },
];
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Ver proyecto" />
    <LoaderSpinner v-if="isLoading" />
    <CardProyecto v-else-if="proyecto" :proyecto="proyecto" />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
