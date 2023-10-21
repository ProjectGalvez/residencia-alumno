<script setup lang="ts">
import TablaEntregas from '../components/TablaEntregas.vue';
import CardCarreras from '../components/CardCarreras.vue';
import CardTotalResidentes from '../components/CardTotalResidentes.vue';
</script>
<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <card-total-residentes />
      <card-carreras />
    </div>
    <div class="row">
      <div class="col-12">
        <TablaEntregas />
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
