<script setup lang="ts">
import { computed, toRef } from 'vue';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { Asesor } from 'src/modules/model/Model';

const props = defineProps<{
  asesor: Asesor;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const asesor = toRef(props, 'asesor');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;

const emit = defineEmits<{ (event: 'guardar', proyecto: Asesor): void }>();
const emitir = () => {
  emit('guardar', asesor.value);
};

const errorMessages = computed(() => {
  return generateErrorMessages(
    errorServer.value as ServerValidationError | null
  );
});
</script>
<template>
  <q-card-section>
    <div class="fontsize-15 text-weight-light">Introduce los datos</div>
  </q-card-section>
  <q-form @submit.prevent="emitir">
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-banner v-if="errorServer" inline-actions class="text-white bg-red">
            {{ errorServerValue?.message || '' }}
            <ul>
              <li v-for="error in errorMessages" :key="error">{{ error }}</li>
            </ul>
          </q-banner>
        </div>

        <div class="col-xs-12">
          <q-input
            v-model="asesor.nombre"
            label-slot
            :rules="[
              (val) => !!val || 'El nombre del asesor es requerido',
              (value) =>
                (value.length > 3 && value.length < 255) ||
                'Debe tener más de 3 caracteres y menos de 255',
            ]"
          >
            <template v-slot:label>
              Nombre del asesor <span class="required-star">*</span>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12">
          <q-input
            v-model="asesor.apellidos"
            label-slot
            :rules="[
              (val) => !!val || 'Los apellidos son requeridos',
              (value) =>
                (value.length > 3 && value.length < 255) ||
                'Debe tener más de 3 caracteres y menos de 255',
            ]"
          >
            <template v-slot:label>
              Apellidos <span class="required-star">*</span>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12">
          <q-input v-model="asesor.titulo" label="Título o carrera" />
        </div>
        <div class="col-xs-12">
          <q-input v-model="asesor.email" label="Email" />
        </div>
        <div class="col-xs-12">
          <q-input
            v-model="asesor.telefono"
            label="Teléfono"
            mask="(###) ### - ####"
          />
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
</template>

<style scoped></style>
