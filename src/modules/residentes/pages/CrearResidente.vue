<script setup lang="ts">
import { ref } from 'vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useObtenerPeriodos from 'src/modules/periodos/composables/useObtenerPeriodos';
import useObtenerEmpresas from 'src/modules/empresas/composables/useObtenerEmpresas';
import useEstudiantesSinResidencia from '../composables/useEstudiantesSinResidencia';

const residente = ref({
  estudiante_id: '',
  proyecto: '',
  empresa_id: '',
  periodo_id: '',
});
const { data: periodos, isLoading: isLoadingPeriodos } = useObtenerPeriodos();
const { data: empresas, isLoading: isLoadingEmpresas } = useObtenerEmpresas();
const { data: estudiantes, isLoading: isLoadingEstudiantes } =
  useEstudiantesSinResidencia();

const guardar = () => {
  console.log('Guardar');
};
const links: Breadcrumb[] = [
  { label: 'Residentes', icon: 'history_edu', to: 'listar-residente' },
  { label: 'Asignar residencia', icon: 'add_circle_outline' },
];
</script>

<template>
  <q-page padding>
    <breadcrumb-nav
      :pages="links"
      titlePage="Asignar residencia a un estudiante"
    />
    <div class="row">
      <div class="col">
        <q-card>
          <q-card-section> Asignar residencia </q-card-section>
          <q-form @submit.prevent="guardar">
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-8">
                  <div class="row q-col-gutter-md">
                    <div class="col-xs-12 col-sm-10">
                      <q-select
                        v-model="residente.estudiante_id"
                        :options="estudiantes"
                        label-slot
                        option-value="id"
                        option-label="nombre"
                        :loading="isLoadingEstudiantes"
                        emit-value
                        map-options
                        :rules="[(val) => !!val || 'Selecciona un estudiante']"
                      >
                        <template v-slot:label>
                          Selecciona un estudiante
                          <span class="required-star">*</span>
                        </template>
                      </q-select>
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
                        v-model="residente.periodo_id"
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
                        v-model="residente.proyecto"
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
                        label="Asignar residencia"
                        color="primary"
                        type="submit"
                        :loading="isLoadingEmpresas"
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
