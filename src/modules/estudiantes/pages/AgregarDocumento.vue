<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useVerEstudiante from '../composables/useVerEstudiante';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useObtenerDocumentos from 'src/modules/documentos/composables/useObtenerDocumentos';
import { date } from 'quasar';
import useCrearEntregaEst from '../composables/useCrearEntregaEst';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';

const route = useRoute();
const { id = '' } = route.params;
const { resource: estudiante, isLoading: isLoadingStudent } = useVerEstudiante(
  id + ''
);

const { data: documentos, isLoading: isLoadingDoc } = useObtenerDocumentos();

const entrega = ref({
  estudiante_id: estudiante.value?.id,
  documento_id: '',
  url_documento: null,
  fecha_entrega: '',
  estado: true,
});

const fecha = ref(date.formatDate(new Date(), 'YYYY/MM/DD'));

const { createEntrega, isLoadingCreate, errorServer } = useCrearEntregaEst(
  id + ''
);
const guardar = () => {
  const saveEntrega = new FormData();
  saveEntrega.append('estudiante_id', id + '');
  saveEntrega.append('documento_id', entrega.value.documento_id + '');
  saveEntrega.append('fecha_entrega', fecha.value + '');
  if (entrega.value.url_documento) {
    saveEntrega.append('url_documento', entrega.value.url_documento[0]);
  }
  createEntrega(saveEntrega);
};

const errorMessages = computed(() => {
  return generateErrorMessages(
    errorServer.value as ServerValidationError | null
  );
});

const links: Breadcrumb[] = [
  { label: 'Estudiantes', icon: 'school', to: 'listar-estudiante' },
  { label: 'Agregar documentos', icon: 'assignment_turned_in' },
];
</script>

<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Agregar documento" />
    <q-card>
      <q-card-section>
        <LoaderSpinner v-if="isLoadingStudent" />
        <div v-else-if="estudiante">
          <div
            v-if="estudiante"
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            Asignar documentos de {{ estudiante.nombre }}
            {{ estudiante.apellidos }}
          </div>
        </div>

        <q-form @submit.prevent="guardar">
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

            <div class="col-xs-12 col-sm-8">
              <q-select
                v-model="entrega.documento_id"
                :options="documentos"
                option-value="id"
                option-label="nombre_documento"
                emit-value
                map-options
                label-slot
                :rules="[(val) => !!val || 'Selecciona un documeto']"
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
                v-model="entrega.url_documento"
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
                    @click.stop.prevent="entrega.url_documento = null"
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
                :loading="isLoadingCreate"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
