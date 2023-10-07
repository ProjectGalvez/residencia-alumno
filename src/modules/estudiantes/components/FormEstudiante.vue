<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import { Estudiante } from 'src/modules/model/Model';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import useObtenerCarreras from 'src/modules/carreras/composables/useObtenerCarreras';

const props = defineProps<{
  estudiante: Estudiante;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const { data: carreras } = useObtenerCarreras();

const estudiante = toRef(props, 'estudiante');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;

const emit = defineEmits<{
  (event: 'guardar', estudiante: Estudiante): void;
}>();
const emitir = () => {
  emit('guardar', estudiante.value);
};
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

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="estudiante.nombre"
                  label-slot
                  :rules="[
                    (val) => !!val || 'El nombre del estudiante es requerido',
                    (value) =>
                      (value.length > 3 && value.length < 255) ||
                      'Debe tener más de 3 caracteres y menos de 255',
                  ]"
                >
                  <template v-slot:label>
                    Nombre(s): <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="estudiante.apellidos"
                  label-slot
                  :rules="[
                    (val) => !!val || 'El nombre del estudiante es requerido',
                    (value) =>
                      (value.length > 3 && value.length < 255) ||
                      'Debe tener más de 3 caracteres y menos de 255',
                  ]"
                >
                  <template v-slot:label>
                    Apellidos: <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="estudiante.numero_control"
                  label-slot
                  :rules="[
                    (val) => !!val || 'El número de control es requerido',
                    (value) =>
                      (value.length > 3 && value.length < 255) ||
                      'Debe tener más de 3 caracteres y menos de 255',
                  ]"
                >
                  <template v-slot:label>
                    Número de control: <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-select
                  v-model="estudiante.carrera_id"
                  :options="carreras"
                  label-slot
                  option-value="id"
                  option-label="nombre"
                  emit-value
                  map-options
                  :rules="[(val) => !!val || 'Selecciona una carrera']"
                >
                  <template v-slot:label>
                    Carrera <span class="required-star">*</span>
                  </template>
                </q-select>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input v-model="estudiante.telefono" label-slot>
                  <template v-slot:label> Teléfono: </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="estudiante.email"
                  label-slot
                  :rules="[
                    (val) => !!val || 'El correo es requerido',
                    (value) =>
                      (value.length > 3 && value.length < 255) ||
                      'Debe tener más de 3 caracteres y menos de 255',
                  ]"
                >
                  <template v-slot:label>
                    Correo electrónico: <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input v-model="estudiante.seguridad_social" label-slot>
                  <template v-slot:label> Seguridad social: </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input v-model="estudiante.no_seguridad_social" label-slot>
                  <template v-slot:label>
                    Número de seguridad social:
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input v-model="estudiante.domicilio" label-slot>
                  <template v-slot:label> Domicilio: </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input v-model="estudiante.ciudad" label-slot>
                  <template v-slot:label> Ciudad: </template>
                </q-input>
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
          </div>
          <div class="col-xs-12 col-sm-4 q-pl-md">
            <!-- Datos user -->
            <div class="text-subtitle1">Datos de usuario del estudiante:</div>
            <div class="text-weight-medium">Nombre:</div>
            <div class="text-weight-light text-subtitle1">
              {{ estudiante.nombre }} {{ estudiante.apellidos }}
            </div>
            <div class="text-weight-medium">Correo:</div>
            <div class="text-weight-light text-subtitle1">
              {{ estudiante.email }}
            </div>

            <div>
              <q-input
                v-model="estudiante.password"
                hint="Si no coloca la contraseña, esta sera password"
                label-slot
              >
                <template v-slot:label> Contraseña: </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<style scoped></style>