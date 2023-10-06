<script setup lang="ts">
import { computed, toRef } from 'vue';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { Empresa } from 'src/modules/model/Model';

const props = defineProps<{
  empresa: Empresa;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const empresa = toRef(props, 'empresa');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;

const emit = defineEmits<{ (event: 'guardar', periodo: Empresa): void }>();
const emitir = () => {
  emit('guardar', empresa.value);
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
              v-model="empresa.nombre"
              label-slot
              :rules="[
                (val) => !!val || 'El nombre de la empresa es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Nombre de la empresa <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-2">
            <q-input
              v-model="empresa.giro"
              label-slot
              :rules="[
                (val) => !!val || 'El giro de la empresa es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Giro <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-2">
            <q-input v-model="empresa.rfc" label-slot>
              <template v-slot:label> RFC </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-2">
            <q-input v-model="empresa.telefono" label-slot>
              <template v-slot:label> Teléfono </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="empresa.domicilio"
              label-slot
              :rules="[
                (val) => !!val || 'El domicilio de la empresa es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres',
              ]"
            >
              <template v-slot:label>
                Domicilio de la empresa <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-2">
            <q-input
              v-model="empresa.colonia"
              label-slot
              :rules="[
                (val) => !!val || 'La colonia de la empresa es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres',
              ]"
            >
              <template v-slot:label>
                Colonia <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-2">
            <q-input v-model="empresa.cp" label-slot>
              <template v-slot:label> Codigo postal </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-2">
            <q-input v-model="empresa.ciudad" label-slot>
              <template v-slot:label> Ciudad </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-12">
            <q-input v-model="empresa.mision" label-slot type="textarea">
              <template v-slot:label> Misión </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="empresa.titular"
              label-slot
              :rules="[
                (val) => !!val || 'El nombre del titular es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres',
              ]"
            >
              <template v-slot:label>
                Titular de la empresa <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="empresa.titular_puesto"
              label-slot
              :rules="[
                (val) => !!val || 'El puesto del titular es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres',
              ]"
            >
              <template v-slot:label>
                Puesto del titular<span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input v-model="empresa.asesor_externo" label-slot>
              <template v-slot:label> Nombre del asesor externo </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input v-model="empresa.asesor_externo_puesto" label-slot>
              <template v-slot:label> Puesto del asesor externo </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input v-model="empresa.nombre_firmara" label-slot>
              <template v-slot:label> Nombre del que firmará </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input v-model="empresa.nombre_firmara_puesto" label-slot>
              <template v-slot:label> Puesto del que firmará </template>
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
      </q-card-section>
    </q-form>
  </q-card>
</template>

<style scoped></style>
