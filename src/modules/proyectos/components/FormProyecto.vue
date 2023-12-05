<script setup lang="ts">
import { computed, toRef } from 'vue';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { Proyecto } from 'src/modules/model/Model';
import useObtenerCarreras from 'src/modules/carreras/composables/useObtenerCarreras';

const props = defineProps<{
  proyecto: Proyecto;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const proyecto = toRef(props, 'proyecto');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;
const { data: carreras, isLoading: loadingCarreras } = useObtenerCarreras();

const emit = defineEmits<{ (event: 'guardar', proyecto: Proyecto): void }>();
const emitir = () => {
  emit('guardar', proyecto.value);
};

const tipos = ['Banco de Proyectos', 'Propuesta propia', 'Trabajador'];
const errorMessages = computed(() => {
  return generateErrorMessages(
    errorServer.value as ServerValidationError | null
  );
});
</script>
<template>
  <q-card>
    <q-card-section>
      <div class="fontsize-15 text-weight-light">Introduce los datos</div>
    </q-card-section>
    <q-form @submit.prevent="emitir">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-banner
              v-if="errorServer"
              inline-actions
              class="text-white bg-red"
            >
              {{ errorServerValue?.message || '' }}
              <ul>
                <li v-for="error in errorMessages" :key="error">{{ error }}</li>
              </ul>
            </q-banner>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="proyecto.nombre"
              label-slot
              :rules="[
                (val) => !!val || 'El nombre del proyecto es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Nombre del proyecto <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="proyecto.tipo"
              :options="tipos"
              label="Género"
              option-value="id"
              option-label="label"
              label-slot
              :rules="[(val) => !!val || 'Selecciona un tipo']"
            >
              <template v-slot:label>
                Tipo de proyecto <span class="required-star">*</span>
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="proyecto.carrera_id"
              :options="carreras"
              label-slot
              option-value="id"
              option-label="nombre"
              emit-value
              map-options
              :rules="[(val) => !!val || 'Selecciona una carrera']"
              :loading="loadingCarreras"
            >
              <template v-slot:label>
                Carrera <span class="required-star">*</span>
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-7">
            <q-btn
              label="Guardar"
              color="primary"
              type="submit"
              :loading="loading"
            />
          </div>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<style scoped></style>
