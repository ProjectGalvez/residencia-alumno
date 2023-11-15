<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import usePeriodosCarrera from '../composables/usePeriodosCarrera';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const carreras = ref();
const periodos = ref();

const { data, isLoading, refetch } = usePeriodosCarrera();
onMounted(() => {
  refetch();
});

const obtenerCarrerasUnicas = () => {
  if (data.value) {
    const carrerasUnicas = new Set();

    data.value.forEach((item) => {
      carrerasUnicas.add(item.carrera);
    });
    carreras.value = Array.from(carrerasUnicas);
  }
};

const obtenerPeriodosUnicos = () => {
  if (data.value) {
    const periodosUnicos = new Set();
    data.value.forEach((item) => {
      periodosUnicos.add(item.periodo);
    });
    periodos.value = Array.from(periodosUnicos);
  }
};

// Llamar a las funciones para obtener carreras y periodos únicos
watch(data, () => {
  obtenerCarrerasUnicas();
  obtenerPeriodosUnicos();
});
const getCantidadEstudiantes = (periodo, carrera) => {
  if (data) {
    const estudiante = data.value.find(
      (item) => item.periodo === periodo && item.carrera === carrera
    );

    return estudiante ? estudiante.cantidad_estudiantes : 0;
  }

  return 0; // O devuelve algún valor predeterminado en caso de que los datos aún no estén disponibles
};
</script>
<template>
  <LoaderSpinner v-if="isLoading" />
  <q-card v-else-if="data">
    <q-card-section>
      <div class="fontsize-14">Estudiantes por carrera y por periodo</div>
    </q-card-section>
    <q-card-section>
      <q-markup-table>
        <thead>
          <tr>
            <th>Periodos</th>
            <th v-for="carrera in carreras" :key="carrera">{{ carrera }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="periodo in periodos" :key="periodo">
            <td>{{ periodo }}</td>
            <td v-for="carrera in carreras" :key="carrera">
              {{ getCantidadEstudiantes(periodo, carrera) }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
