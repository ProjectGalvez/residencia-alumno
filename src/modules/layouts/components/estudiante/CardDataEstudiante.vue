<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useEstudiante from './composables/useEstudiante';

const { isLoading, data: estudiante } = useEstudiante();
</script>

<template>
  <LoaderSpinner v-if="isLoading" />
  <q-card v-else-if="estudiante?.nombre">
    <q-card-section>
      <div class="fontsize-18 text-center text-weight-light flex items-center">
        <q-icon name="school" class="q-mr-xs" />
        Bienvenido(a) {{ estudiante.nombre }} {{ estudiante.apellidos }}
      </div>
    </q-card-section>
    <q-card-section>
      ¡Bienvenido a la Plataforma de Residencias Profesionales del Instituto
      Tecnológico de Tecomatlán! Aquí, podrás gestionar tus documentos,
      descargar formatos y acceder a recursos útiles para aprovechar al máximo
      tu experiencia de Residencia Profesional. ¡Te deseamos mucho éxito en tu
      viaje educativo y profesional!
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <div class="text-weight-medium">Nombre(s):</div>
          <div class="text-subtitle1 text-weight-light">
            {{ estudiante.nombre }}
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-3">
          <div class="text-weight-medium">Apellidos:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ estudiante.apellidos }}
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-3">
          <div class="text-weight-medium">Número de control:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ estudiante.numero_control }}
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-3">
          <div class="text-weight-medium">Correo electrónico:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ estudiante.email }}
          </div>
        </div>

        <div class="col-xs-12 col-sm-8 col-md-8">
          <div class="text-weight-medium">Carrera:</div>
          <div class="flex items-center">
            <q-img
              :src="estudiante.carrera?.escudo"
              height="35px"
              width="40px"
            />
            <div class="text-subtitle1 text-weight-light q-pl-sm">
              {{ estudiante.carrera?.nombre }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
