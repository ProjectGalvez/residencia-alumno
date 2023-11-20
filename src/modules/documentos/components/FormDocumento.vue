<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import { Documento } from 'src/modules/model/Model';

const props = defineProps<{
  documento: Documento;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const documento = toRef(props, 'documento');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;
const formatoInput = ref<any>(null);
const fecha = ref(documento.value.fecha_limite + '');
const emit = defineEmits<{ (event: 'guardar', documento: FormData): void }>();

const emitir = () => {
  const saveDocumento = new FormData();
  saveDocumento.append('id', documento.value.id + '');
  saveDocumento.append('nombre_documento', documento.value.nombre_documento);
  saveDocumento.append('abrev_nombre', documento.value.abrev_nombre + '');
  saveDocumento.append('fecha_limite', fecha.value);
  saveDocumento.append(
    'entrega_estudiante',
    documento.value.entrega_estudiante + ''
  );
  saveDocumento.append('descripcion', documento.value.descripcion + '');
  if (formatoInput.value) {
    saveDocumento.append('url_formato', formatoInput.value[0]);
  }
  emit('guardar', saveDocumento);
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
          <div class="col-xs-12 col-sm-8">
            <q-input
              v-model="documento.nombre_documento"
              label-slot
              hint="Nombre completo del documento: Solicitud de residencia profesional."
              :rules="[
                (val) => !!val || 'El nombre del documento es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Nombre del documento <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="documento.abrev_nombre"
              hint="Abreviación del nombre del documento: Sol. residencia. 😜"
              label-slot
              :rules="[
                (value) =>
                  value.length < 255 ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Abreviación del nombre del documento
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="fecha"
              hint="Fecha programada para su entrega o fecha que debería llevar el documento."
              mask="date"
              :rules="[(val) => !!val || 'La fecha es requerida']"
              label-slot
            >
              <template v-slot:label>
                Fecha límite de entrega <span class="required-star">*</span>
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

          <div class="col-xs-12 col-sm-6">
            <q-file
              bottom-slots
              v-model="formatoInput"
              hint="Archivo de formato del documento (imagen, word, pdf), es opcional."
              label-slot
              counter
              multiple
              accept=".jpg, image/*, .doc, .docx, .pdf"
            >
              <template v-slot:label> Formato del documento: </template>

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

          <div class="col-xs-12 col-sm-8">
            <div>
              Descripción del formato con lujo de detalles 😊
              <q-editor
                v-model="documento.descripcion"
                :toolbar="[
                  ['bold', 'italic', 'underline'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: ['p', 'h3', 'h4', 'h5', 'h6', 'code'],
                    },
                  ],
                  [
                    {
                      label: 'Dynamic label',
                      icon: 'help_outline',
                      options: ['left', 'center', 'right', 'justify'],
                    },
                  ],
                ]"
                min-height="5rem"
              />
            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-toggle
              :false-value="0"
              :true-value="1"
              v-model="documento.entrega_estudiante"
              label="Entegado por estudiante"
              left-label
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
