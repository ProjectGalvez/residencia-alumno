<script setup lang="ts">
import useTabla from '../composables/useTabla';

import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
const { data, isLoading, isError, error } = useTabla();
</script>

<template>
  <q-card class="q-mt-md q-mb-md">
    <q-card-section>
      <div class="fontsize-14 text-center text-weight-light flex items-center">
        Lista de entrega de documentos
      </div>
    </q-card-section>
    <q-card-section>
      <div>
        <LoaderSpinner v-if="isLoading" />
        <div v-else-if="data" class="table-container">
          <table>
            <thead>
              <tr>
                <th class="sticky-column">Estudiante</th>
                <th
                  v-for="documento in data.documentos"
                  :key="documento.id"
                  class="vertical-text"
                >
                  {{ documento.nombre_documento }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="estudiante in data.estudiantes" :key="estudiante.id">
                <td class="sticky-column">
                  <RouterLink
                    :to="{
                      name: 'ver-estudiante',
                      params: { id: estudiante.id },
                    }"
                  >
                    {{ estudiante.nombre }} {{ estudiante.apellidos }}
                    <q-chip
                      dense
                      :style="{ backgroundColor: estudiante.carrera?.color }"
                      text-color="white"
                      icon="school"
                    >
                      {{ estudiante.carrera?.abrev }}
                    </q-chip>
                  </RouterLink>
                </td>
                <td
                  v-for="documento in data.documentos"
                  :key="documento.id"
                  class="text-center"
                >
                  <span v-if="data.data[estudiante.id][documento.id] === 1"
                    >✅</span
                  >
                  <span v-else-if="data.data[estudiante.id][documento.id] === 0"
                    >❌</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="isError">{{ error }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.vertical-text {
  transform: rotate(-90deg);
}
/* Elimina margen y padding predeterminados en toda la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  padding: 0;
}

/* Estilo para el encabezado de la tabla */
thead {
  background-color: #f2f2f2;
  font-weight: bold;
  padding: 0;
}

/* Estilo para las celdas de encabezado */
th {
  text-align: center;
  vertical-align: middle;
  border: 1px solid #ddd;
  margin: 0;
  padding: 0px; /* Ajusta este valor según sea necesario */
}

/* Estilo para las celdas de datos */
td {
  text-align: center;
  vertical-align: middle;
  border: 1px solid #ddd;
  margin: 0;
  padding: 0px; /* Ajusta este valor según sea necesario */
}

.body--light th {
}

.body--dark th {
  color: black;
}

/* Estilo para filas alternas (opcional) */
tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table-container {
  overflow-x: auto;
}

.sticky-column {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  background-color: #f2f2f2;
  z-index: 1;
}
</style>
