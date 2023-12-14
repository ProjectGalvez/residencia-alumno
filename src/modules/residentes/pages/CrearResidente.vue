<script setup lang="ts">
import DialogAsesor from '../../../shared/components/DialogAsesor.vue';
import SelectEstudiantesSInResidencia from '../../../shared/components/SelectEstudiantesSInResidencia.vue';
import SelectEmpresa from '../../../shared/components/SelectEmpresa.vue';
import SelectPeriodo from '../../../shared/components/SelectPeriodo.vue';
import DialogProyecto from '../../../shared/components/DialogProyecto.vue';
import SelectAsesor from '../../asesores/components/SelectAsesor.vue';
import SelectProyecto from '../../../shared/components/SelectProyecto.vue';
import { ref } from 'vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useAsignarResidencia from '../composables/useAsignarResidencia';

const residente = ref({
  estudiante_id: '',
  proyecto_id: null,
  area_id: null,
  periodo_id: null,
  asesor_interno_id: null,
});
const crearProyecto = ref(false);
const crearAsesor = ref(false);
const { mutate, isLoading: isLoadingAsignar } = useAsignarResidencia(
  residente.value.estudiante_id
);

const guardar = () => {
  mutate(residente.value);
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
    <DialogProyecto v-model="crearProyecto" />
    <DialogAsesor v-model="crearAsesor" />
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
                      <SelectEstudiantesSInResidencia
                        v-model="residente.estudiante_id"
                        label="Selecciona un estudiante"
                        :rules="[(val) => !!val || 'Selecciona un estudiante']"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-10">
                      <SelectProyecto
                        v-model="residente.proyecto_id"
                        label="Proyecto"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-2">
                      <q-btn
                        label="Nuevo proyecto"
                        size="sm"
                        @click="crearProyecto = true"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-10">
                      <SelectAsesor
                        v-model="residente.asesor_interno_id"
                        label="Asesor interno"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-2">
                      <q-btn
                        label="Nuevo asesor"
                        size="sm"
                        @click="crearAsesor = true"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-10">
                      <SelectPeriodo
                        v-model="residente.periodo_id"
                        label="Selecciona un periodo"
                        :rules="[(val) => !!val || 'Selecciona un periodo']"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-10">
                      <SelectEmpresa
                        v-model="residente.area_id"
                        label="Selecciona una empresa"
                        :rules="[(val) => !!val || 'Selecciona una empresa']"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-7">
                      <q-btn
                        label="Asignar residencia"
                        color="primary"
                        type="submit"
                        :loading="isLoadingAsignar"
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
