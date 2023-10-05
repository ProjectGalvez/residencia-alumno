<script setup lang="ts">
import { computed, toRef, ref } from 'vue';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { Periodo } from 'src/modules/model/Model';

const props = defineProps<{
  periodo: Periodo;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();
const periodo = toRef(props, 'periodo');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;
const fechaInicio = ref(periodo.value.fecha_inicio + '');
const fechaTermino = ref(periodo.value.fecha_termino + '');
const activoLocal = ref(periodo.value.activo ? true : false);

const emit = defineEmits<{ (event: 'guardar', periodo: Periodo): void }>();
const emitir = () => {
  periodo.value.fecha_inicio = fechaInicio.value;
  periodo.value.fecha_termino = fechaTermino.value;
  periodo.value.activo = activoLocal.value;
  emit('guardar', periodo.value);
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
              v-model="periodo.nombre"
              label-slot
              :rules="[
                (val) => !!val || 'El nombre del periodo es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Nombre del periodo <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="fechaTermino"
              mask="date"
              :rules="[(val) => !!val || 'La fecha de termino es requerido']"
              label-slot
            >
              <template v-slot:label>
                Fecha de termino del periodo
                <span class="required-star">*</span>
              </template>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="fechaTermino">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="fechaInicio"
              mask="date"
              :rules="[(val) => !!val || 'La fecha de termino requerida']"
              label-slot
            >
              <template v-slot:label>
                Fecha de termino del periodo
                <span class="required-star">*</span>
              </template>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="fechaInicio">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-toggle
              v-model="activoLocal"
              checked-icon="check"
              color="green"
              label="Inactivo / Activo"
              unchecked-icon="clear"
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
  </q-card>
</template>

<style scoped></style>
