<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { date } from 'quasar';
import useObtenerDocumentos from 'src/modules/documentos/composables/useObtenerDocumentos';
import documentosApi from 'src/api/documentosApi';
import useAutcompletarEstudiante from '../composables/useAutcompletarEstudiante';
import { Entrega } from 'src/modules/model/Model';

const props = defineProps<{
  entrega: Entrega;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const entrega = toRef(props, 'entrega');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;
const formatoInput = ref<any>(null);

const { data: documentos, isLoading: isLoadingDoc } = useObtenerDocumentos();

/*************************** */
const { data: estudiantes, isLoading } = useAutcompletarEstudiante('');
const lista = ref(estudiantes.value);
if (!isLoading.value) {
  console.log(estudiantes.value);
}

const loadingEst = ref(isLoading.value);
const onFilterTest = async (val, update /* abort */) => {
  const nombre = val === '' ? '' : val;
  loadingEst.value = true;

  const response = await documentosApi.get('/estudiante-autompletar', {
    params: { busqueda: nombre },
  });
  let list = response.data;
  if (val) {
    const needle = val.toLowerCase();
    estudiantes.value = response.data.filter((x) =>
      x.nombre_completo.toLowerCase().includes(needle)
    );
  }
  update(() => {
    estudiantes.value = list;
    loadingEst.value = false;
  });
};
/***************************** */

const fecha = ref(date.formatDate(new Date(), 'YYYY/MM/DD'));
const emit = defineEmits<{ (event: 'guardar', entrega: FormData): void }>();

const guardar = () => {
  const saveEntrega = new FormData();
  saveEntrega.append('id', entrega.value.id);
  saveEntrega.append(
    'estudiante_id',
    entrega.value.estudiante_id.estudiante_id + ''
  );
  saveEntrega.append('documento_id', entrega.value.documento_id + '');
  saveEntrega.append('fecha_entrega', fecha.value + '');
  if (formatoInput.value) {
    saveEntrega.append('url_documento', formatoInput.value[0]);
  }
  emit('guardar', saveEntrega);
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
      <q-form @submit.prevent="guardar">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            {{ estudiantes }}
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

          <div class="col-xs-12 col-sm-8">
            <q-select
              clearable
              v-model="entrega.estudiante_id"
              use-input
              hide-selected
              fill-input
              :options="estudiantes"
              option-value="estudiante_id"
              option-label="nombre_completo"
              input-debounce="0"
              label-slot
              @filter="onFilterTest"
              :rules="[(val) => !!val || 'Selecciona un estudiante']"
            >
              <template v-slot:label>
                Estudiante <span class="required-star">*</span>
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay resultados
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div class="col-xs-12 col-sm-8">
            <q-select
              v-model="entrega.documento_id"
              :options="documentos"
              option-value="id"
              option-label="nombre_documento"
              emit-value
              map-options
              label-slot
              :rules="[(val) => !!val || 'Selecciona un documento']"
              :loading="isLoadingDoc"
            >
              <template v-slot:label>
                Documento: <span class="required-star">*</span>
              </template>
            </q-select>
          </div>

          <div class="col-xs-12 col-sm-8">
            <q-input
              v-model="fecha"
              mask="date"
              :rules="[(val) => !!val || 'La fecha es requerida']"
              label-slot
            >
              <template v-slot:label>
                Fecha de entrega <span class="required-star">*</span>
              </template>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="fecha">
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

          <div class="col-xs-12 col-sm-8">
            <q-file
              bottom-slots
              v-model="formatoInput"
              label-slot
              counter
              multiple
              accept=".doc, .docx, .pdf"
            >
              <template v-slot:label> Formato llenado: </template>

              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>

              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="formatoInput = null"
                  class="cursor-pointer"
                />
              </template>
            </q-file>
          </div>

          <div class="col-xs-12 col-sm-7">
            <q-btn
              label="Agregar documento"
              color="primary"
              type="submit"
              :loading="loading"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
