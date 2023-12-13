<script setup lang="ts">
import { computed, toRef } from 'vue';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { Area } from 'src/modules/model/Model';

const props = defineProps<{
  area: Area;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const area = toRef(props, 'area');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;

const emit = defineEmits<{ (event: 'guardar', empresa: Area): void }>();
const emitir = () => {
  emit('guardar', area.value);
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
              v-model="area.nombre"
              label-slot
              :rules="[
                (val) => !!val || 'El nombre de la empresa es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Nombre del área <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input v-model="area.asesor_externo" label-slot>
              <template v-slot:label> Nombre del asesor externo </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input v-model="area.asesor_externo_puesto" label-slot>
              <template v-slot:label> Puesto del asesor externo </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input v-model="area.nombre_firmara" label-slot>
              <template v-slot:label> Nombre del que firmará </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input v-model="area.nombre_firmara_puesto" label-slot>
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
