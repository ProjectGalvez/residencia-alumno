<script setup lang="ts">
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import PorPeriodoCarrera from '../components/PorPeriodoCarrera.vue';

const links: Breadcrumb[] = [{ label: 'Estadísticas', icon: 'show_chart' }];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav
      :pages="links"
      titlePage="Residentes por periodo y por carrera"
    />
    <PorPeriodoCarrera />
  </q-page>
</template>

<style scoped></style>
