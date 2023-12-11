<script setup lang="ts">
import SelectProyObj from '../../../shared/components/SelectProyObj.vue';
import SelectAsesorObject from '../../asesores/components/SelectAsesorObject.vue';
import SelectEmpresa from '../../../shared/components/SelectEmpresa.vue';
import SelectPeriodo from '../../../shared/components/SelectPeriodo.vue';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import useVerResidente from '../composables/useVerResidente';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useActualizarResidencia from '../composables/useActualizarResidencia';

const route = useRoute();
const { id = '' } = route.params;

const { isLoading: isLoadingResidente, residente } = useVerResidente(id + '');
const {
  mutate,
  errorServer,
  isLoading: isLoadignActualizar,
} = useActualizarResidencia(id + '');

interface Asesor {
  id: number;
  nombre_completo: string;
}
interface Proyecto {
  id: number;
  nombre: string;
}
const asesor = ref<Asesor>({
  id: 0,
  nombre_completo: '',
});
const proyecto = ref<Proyecto>({
  id: 0,
  nombre: '',
});
watch(residente, (newResidente, oldResidente) => {
  if (newResidente) {
    asesor.value.id = newResidente.asesor_id;
    asesor.value.nombre_completo = newResidente.nombre_asesor;
    proyecto.value.id = newResidente.proyecto_id;
    proyecto.value.nombre = newResidente.proyecto;
  }
});

const guardar = () => {
  const data = new FormData();
  data.append('estudiante_id', id + '');
  data.append('empresa_id', residente.value.id_empresa);
  data.append('proyecto_id', proyecto.value.id + '');
  data.append('periodo_id', residente.value.id_periodo);
  data.append('asesor_interno_id', asesor.value.id + '');
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
                      <SelectProyObj
                        v-model="proyecto"
                        label="Selecciona un proyecto"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-10">
                      <SelectAsesorObject
                        v-model="asesor"
                        label="Selecciona un asesor"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-10">
                      <SelectPeriodo
                        v-model="residente.id_periodo"
                        label="Selecciona un periodo"
                        :rules="[(val) => !!val || 'Selecciona un periodo']"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-10">
                      <SelectEmpresa
                        v-model="residente.id_empresa"
                        label="Selecciona una empresa"
                        :rules="[(val) => !!val || 'Selecciona una empresa']"
                      />
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
