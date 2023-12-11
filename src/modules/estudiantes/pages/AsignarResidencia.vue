<script setup lang="ts">
import SelectAsesor from '../../asesores/components/SelectAsesor.vue';
import SelectProyecto from '../../../shared/components/SelectProyecto.vue';
import SelectEmpresa from '../../../shared/components/SelectEmpresa.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useVerPeriodoActivo from '../composables/useVerPeriodoActivo';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerEstudiante from '../composables/useVerEstudiante';

import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useAsignarResidencia from '../composables/useAsignarResidencia';

const { resource, isLoading, error } = useVerPeriodoActivo();

const route = useRoute();
const { id = '' } = route.params;
const { resource: estudiante } = useVerEstudiante(id + '');
const residencia = ref({
  empresa_id: null,
  proyecto_id: null,
  periodo_id: resource.value?.id,
  asesor_interno_id: null,
  estudiante_id: id,
});

const { mutate, isLoading: loadingMutate } = useAsignarResidencia(id + '');
const guardar = async () => {
  mutate(residencia.value);
};

const links: Breadcrumb[] = [
  { label: 'Estudiantes', icon: 'school', to: 'listar-estudiante' },
  { label: 'Asignar residencia', icon: 'add_reaction' },
];
</script>

<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Asignar residencia" />
    <q-card>
      <q-card-section>
        <LoaderSpinner v-if="isLoading" />
        <div v-else-if="resource">
          <div
            v-if="estudiante"
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            Asignar residencia a {{ estudiante.nombre }}
            {{ estudiante.apellidos }}
          </div>
          <q-form @submit.prevent="guardar">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-8">
                <SelectEmpresa
                  v-model="residencia.empresa_id"
                  label="Selecciona una empresa"
                />
              </div>

              <div class="col-xs-12 col-sm-8">
                <SelectProyecto
                  v-model="residencia.proyecto_id"
                  label="Selecciona un proyecto"
                />
              </div>
              <div class="col-xs-12 col-sm-8">
                <SelectAsesor
                  v-model="residencia.asesor_interno_id"
                  label="Selecciona un asesor"
                />
              </div>

              <div class="col-xs-12 col-sm-7">
                <q-btn
                  label="Asignar residencia"
                  color="primary"
                  type="submit"
                  :loading="loadingMutate"
                />
              </div>
            </div>
          </q-form>
        </div>
        <div v-else>
          <q-banner inline-actions class="text-white bg-red">
            No hay un periodo activo, necesitas tener un periodo activo primero,
            puedes editar los periodos en la lista de periodos
            <RouterLink :to="{ name: 'listar-periodo' }"
              >Ir a periodos</RouterLink
            >
          </q-banner>
        </div>
        <div v-if="error">
          {{ error }}
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
