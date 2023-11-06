<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useResidencia from './composables/useResidencia';
const { isLoading, error, data } = useResidencia();
</script>

<template>
  <loader-spinner v-if="isLoading" />
  <q-card
    v-else-if="data && data?.length > 0"
    v-for="residencia in data"
    :key="residencia.empresa_id"
  >
    <q-card-section>
      <div class="fontsize-14 text-weight-light flex items-center">
        {{ residencia.proyecto }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-auto">
          <div class="fontsize-13 text-weight-light q-mb-xs">
            Periodo {{ residencia.nombre_periodo }}
          </div>
        </div>
      </div>
      <div
        class="fit row wrap justify-start items-start content-start q-gutter-md"
      >
        <div class="col-auto">
          <div class="text-weight-medium">Empresa:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residencia.nombre_empresa }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">RFC:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residencia.rfc }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Teléfono:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residencia.telefono }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Dirección:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residencia.domicilio }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Ciudad:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residencia.ciudad }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Código postal:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residencia.cp }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Colonia:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residencia.colonia }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Titular de la empresa:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residencia.titular }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Puesto del titular:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residencia.titular_puesto }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <div v-else-if="data && data.length < 0">
    No se te ha asignado residencia aún
  </div>
  <div v-else-if="error">{{ error }}</div>
</template>

<style scoped></style>
