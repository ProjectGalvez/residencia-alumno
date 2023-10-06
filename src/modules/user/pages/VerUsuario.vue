<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerUser from '../composables/useVerUser';
import CardUser from '../components/CardUser.vue';

const route = useRoute();
const { id = '' } = route.params;
const { resource: user, isLoading, error } = useVerUser(id + '');

const links: Breadcrumb[] = [
  {
    label: 'Usuarios',
    icon: 'people',
    to: 'listar-usuario',
  },
  { label: 'Ver usuario', icon: 'visibility' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver carrera" />
    <LoaderSpinner v-if="isLoading" />
    <CardUser v-else-if="user" :user="user" />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
