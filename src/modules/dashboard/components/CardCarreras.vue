<script setup lang="ts">
import { useRouter } from 'vue-router';
import useNumeroResidentesCarrera from '../composables/useNumeroResidentesCarrera';
const { data, isLoading } = useNumeroResidentesCarrera();

const router = useRouter();
const verCarrera = (idCarrera: number) => {
  router.push({ name: 'ver-carrera', params: { id: idCarrera } });
};
</script>

<template>
  <q-spinner v-if="isLoading" color="primary" size="3em" :thickness="2" />

  <div
    v-else-if="data"
    class="col-xs-12 col-sm-3"
    v-for="carrera in data"
    :key="carrera.carrera_id"
  >
    <q-card
      class="text-white clickable"
      flat
      bordered
      :style="{ backgroundColor: carrera.color }"
      @click="verCarrera(carrera.carrera_id)"
    >
      <q-card-section>
        <div
          class="fontsize-11 text-center text-weight-light flex items-center"
        >
          {{ carrera.carrera }}
        </div>
        <div class="flex items-center justify-between">
          <q-img v-if="carrera.escudo" :src="carrera.escudo" width="65px" />
          <div class="text-right text-h2">
            {{ carrera.numero_estudiantes }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
