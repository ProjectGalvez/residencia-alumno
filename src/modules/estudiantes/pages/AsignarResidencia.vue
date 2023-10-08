<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useVerPeriodoActivo from '../composables/useVerPeriodoActivo';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerEstudiante from '../composables/useVerEstudiante';
import useObtenerEmpresas from 'src/modules/empresas/composables/useObtenerEmpresas';
import documentosApi from 'src/api/documentosApi';

import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useAsignarResidencia from '../composables/useAsignarResidencia';

const { resource, isLoading, error } = useVerPeriodoActivo();
const { data: empresas, isLoading: loadingEmpresa } = useObtenerEmpresas();
const lista = ref(empresas.value);

const route = useRoute();
const { id = '' } = route.params;
const { resource: estudiante } = useVerEstudiante(id + '');
const residencia = ref({
  empresa_id: '',
  proyecto: '',
});
const loading = ref(false);
const onFilterTest = async (val, update /* abort */) => {
  const nombre = val === '' ? '' : val;
  loading.value = true;

  const response = await documentosApi.get('/empresas-select', {
    params: { nombre: nombre },
  });
  let list = response.data;
  console.log(response.data);
  if (val) {
    const needle = val.toLowerCase();
    list = response.data.filter((x) => x.nombre.toLowerCase().includes(needle));
  }
  update(() => {
    lista.value = list;
    loading.value = false;
  });
};

const { mutate, isLoading: loadingMutate } = useAsignarResidencia(id + '');
const guardar = async () => {
  try {
    const objEnviar = {
      empresa_id: residencia.value.empresa_id.id,
      proyecto: residencia.value.proyecto,
    };
    mutate(objEnviar);
  } catch (e) {
    console.log(e);
  }
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
        <LoaderSpinner v-if="isLoading && loadingEmpresa" />
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
                <q-select
                  clearable
                  v-model="residencia.empresa_id"
                  use-input
                  hide-selected
                  fill-input
                  :options="lista"
                  option-value="id"
                  option-label="nombre"
                  input-debounce="0"
                  label-slot
                  @filter="onFilterTest"
                  :rules="[(val) => !!val || 'Selecciona una empresa']"
                >
                  <template v-slot:label>
                    Empresa de residencia <span class="required-star">*</span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No hay resultados
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>

              <div class="col-xs-12 col-sm-8">
                <q-input
                  v-model="residencia.proyecto"
                  :rules="[
                    (val) => !!val || 'El nombre del proyecto es requerido',
                    (value) =>
                      (value.length > 3 && value.length < 250) ||
                      'Debe tener más de 2 caracteres y menos de 250',
                  ]"
                  label-slot
                >
                  <template v-slot:label>
                    Nombre del proyecto <span class="required-star">*</span>
                  </template>
                </q-input>
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
