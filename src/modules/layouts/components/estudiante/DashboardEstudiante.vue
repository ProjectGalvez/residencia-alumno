<script setup lang="ts">
import CardDataEstudiante from './CardDataEstudiante.vue';
import CardResidencia from './CardResidencia.vue';
</script>
<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-md-8">
        <CardDataEstudiante />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 q-mt-md">
        <CardResidencia />
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
