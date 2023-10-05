<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useVerPeriodo from '../composables/useVerPeriodo';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import CardPeriodo from '../components/CardPeriodo.vue';

const route = useRoute();
const { id = '' } = route.params;
const { resource: periodo, isLoading, error } = useVerPeriodo(id + '');

const links: Breadcrumb[] = [
  { label: 'Periodos', icon: 'date_range', to: 'listar-periodo' },
  { label: 'Ver periodo', icon: 'visibility' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver periodo" />
    <LoaderSpinner v-if="isLoading" />
    <CardPeriodo v-else-if="periodo" :periodo="periodo" />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
