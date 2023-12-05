<script setup lang="ts">
import SelectAsesor from '../components/SelectAsesor.vue';
import CardAsesor from '../components/CardAsesor.vue';
import { useRoute } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerAsesor from '../composables/useVerAsesor';

const route = useRoute();
const { id = '' } = route.params;
const { resource: asesor, isLoading, error } = useVerAsesor(id + '');

const links: Breadcrumb[] = [
  {
    label: 'Asesores',
    icon: 'supervisor_account',
    to: 'listar-asesor',
  },
  { label: 'Ver asesor', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver asesor" />
    <LoaderSpinner v-if="isLoading" />
    <CardAsesor v-else-if="asesor" :asesor="asesor" />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
