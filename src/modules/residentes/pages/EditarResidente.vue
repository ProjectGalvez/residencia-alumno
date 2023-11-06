<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import useVerResidente from '../composables/useVerResidente';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useObtenerPeriodos from 'src/modules/periodos/composables/useObtenerPeriodos';
import useObtenerEmpresas from 'src/modules/empresas/composables/useObtenerEmpresas';
import useActualizarResidencia from '../composables/useActualizarResidencia';

const route = useRoute();
const { id = '' } = route.params;

const { isLoading: isLoadingResidente, residente } = useVerResidente(id + '');
const { data: periodos, isLoading: isLoadingPeriodos } = useObtenerPeriodos();
const { data: empresas, isLoading: isLoadingEmpresas } = useObtenerEmpresas();
const {
  mutate,
  errorServer,
  isLoading: isLoadignActualizar,
} = useActualizarResidencia(id + '');

const guardar = () => {
  const data = new FormData();
  data.append('estudiante_id', id + '');
  data.append('empresa_id', residente.value.id_empresa);
  data.append('proyecto', residente.value.proyecto);
  data.append('periodo_id', residente.value.id_periodo);
  mutate(data);
};

const errorServerValue = errorServer.value as ServerValidationError | null;
const errorMessages = computed(() => {
  return generateErrorMessages(
    errorServer.value as ServerValidationError | null
  );
});

const links: Breadcrumb[] = [
  { label: 'Residentes', icon: 'history_edu', to: 'listar-residente' },
  { label: 'Editar residente', icon: 'edit' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar residente" />
    <LoaderSpinner v-if="isLoadingResidente" />
    <div v-else-if="residente" class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="fontsize-15 text-weight-light">
              Actualizar residencia de {{ residente.nombre_estudiante }}
              {{ residente.apellidos }}
            </div>
          </q-card-section>
          <q-form @submit.prevent="guardar">
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-8">
                  <!-- Form -->
                  <div class="row q-col-gutter-md">
                    <div class="col-12">
                      <q-banner
                        v-if="errorServer"
                        inline-actions
                        class="text-white bg-red"
                      >
                        {{ errorServerValue?.message || '' }}
                        <ul>
                          <li v-for="error in errorMessages" :key="error">
                            {{ error }}
                          </li>
                        </ul>
                      </q-banner>
                    </div>

                    <div class="col-xs-12 col-sm-10">
                      <q-input
                        v-model="residente.proyecto"
                        label-slot
                        :rules="[
                          (val) => !!val || 'El proyecto es requerido',
                          (value) =>
                            (value.length > 3 && value.length < 255) ||
                            'Debe tener más de 3 caracteres y menos de 255',
                        ]"
                      >
                        <template v-slot:label>
                          Nombre del proyecto:
                          <span class="required-star">*</span>
                        </template>
                      </q-input>
                    </div>

                    <div class="col-xs-12 col-sm-10">
                      <q-select
                        v-model="residente.id_periodo"
                        :options="periodos"
                        label-slot
                        option-value="id"
                        option-label="nombre"
                        :loading="isLoadingPeriodos"
                        emit-value
                        map-options
                        :rules="[(val) => !!val || 'Selecciona un periodo']"
                      >
                        <template v-slot:label>
                          Selecciona un periodo
                          <span class="required-star">*</span>
                        </template>
                      </q-select>
                    </div>

                    <div class="col-xs-12 col-sm-10">
                      <q-select
                        v-model="residente.id_empresa"
                        :options="empresas"
                        label-slot
                        option-value="id"
                        option-label="nombre"
                        :loading="isLoadingEmpresas"
                        emit-value
                        map-options
                        :rules="[(val) => !!val || 'Selecciona una empresa']"
                      >
                        <template v-slot:label>
                          Selecciona una empresa
                          <span class="required-star">*</span>
                        </template>
                      </q-select>
                    </div>

                    <div class="col-xs-12 col-sm-7">
                      <q-btn
                        label="Actualizar residencia"
                        color="primary"
                        type="submit"
                        :loading="isLoadignActualizar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
