<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerEstudianteFull from '../composables/useVerEstudianteFull';
import CardEstudiante from '../components/CardEstudiante.vue';

const route = useRoute();
const { id = '' } = route.params;
const {
  resource: estudiante,
  isLoading,
  error,
} = useVerEstudianteFull(id + '');

console.log(estudiante.value);

const links: Breadcrumb[] = [
  { label: 'Estudiantes', icon: 'school', to: 'listar-estudiante' },
  { label: 'Ver estudiante', icon: 'visibility' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver Estudiante" />
    <LoaderSpinner v-if="isLoading" />
    <card-estudiante v-else-if="estudiante" :estudiante="estudiante" />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
