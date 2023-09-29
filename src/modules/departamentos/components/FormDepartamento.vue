<script setup lang="ts">
import { Departamento } from 'src/modules/model/Model';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { computed, toRef } from 'vue';

const props = defineProps<{
  departamento: Departamento;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const departamento = toRef(props, 'departamento');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;

const emit = defineEmits<{ (event: 'guardar', depto: Departamento): void }>();
const emitir = () => {
  emit('guardar', departamento.value);
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
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="departamento.nombre"
              label-slot
              :rules="[
                (val) => !!val || 'El nombre del departamento es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Nombre del departamento <span class="required-star">*</span>
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="departamento.nombre_titular"
              label-slot
              :rules="[
                (val) =>
                  !!val ||
                  'El nombre del titular del departamento es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Nombre del titular del departamento
                <span class="required-star">*</span>
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="departamento.apellidos_titular"
              label-slot
              :rules="[
                (val) => !!val || 'Los apellidos del titular son requeridos',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Apellidos del titular
                <span class="required-star">*</span>
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6">
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
