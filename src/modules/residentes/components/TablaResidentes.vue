<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Residente } from 'src/modules/model/Model';
import DialogEliminar from '../../../shared/components/DialogEliminar.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useCancelarResidencia from '../composables/useCancelarResidencia';

const getResidentes = async (): Promise<Residente[]> => {
  const { data } = await documentosApi.get<Residente[]>('/residentes');
  return data;
};

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { isLoading, data: residentes } = useQuery({
  queryKey: ['residentes'],
  queryFn: () => getResidentes(),
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60,
});

const { cancelarResidencia } = useCancelarResidencia();
const eliminar = (id: string) => {
  confirm.value = true;
  recursoId.value = id;
};

const verResidente = (id: string) => {
  router.push({ name: 'ver-residente', params: { id } });
};

const editarResidente = (id: string) => {
  router.push({ name: 'editar-residente', params: { id } });
};

const porcentajeCalc = (entregados = 0, documentos = 0): number => {
  if (documentos === 0) {
    return 0;
  }

  const porcentaje = (entregados / documentos) * 100;
  return Math.round(porcentaje);
};

const URL = `${process.env.SERVER_URL}`;
const pdf = async () => {
  const exportURL = URL + '/residentes-export-pdf';
  window.open(exportURL, '_blank');
};
</script>

<template>
  <div>
    <loader-spinner v-if="isLoading" />
    <div v-if="residentes && residentes.length > 0">
      <DialogEliminar
        v-model="confirm"
        :recurso-id="recursoId"
        @eliminar="cancelarResidencia"
        mensaje="¿Estas seguro de cancelar la residencia?"
      />

      <div class="flex justify-end">
        <div>
          <q-btn
            round
            icon="picture_as_pdf"
            color="negative"
            size="sm"
            @click="pdf"
          />
        </div>
      </div>

      <q-markup-table>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Empresa</th>
            <th>Proyecto</th>
            <th>Entregas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="residente in residentes" :key="residente.id_estudiante">
            <td>
              <div class="flex items-center q-gutter-sm">
                <div>
                  <q-avatar v-if="residente.url_foto">
                    <q-img :src="residente.url_foto" />
                  </q-avatar>
                  <q-avatar v-else color="primary" text-color="white">
                    {{ residente.iniciales_nombre_apellido }}
                  </q-avatar>
                </div>
                <div>
                  <div>{{ residente.nombre_completo }}</div>
                  <div>
                    <q-chip
                      dense
                      :style="{ backgroundColor: residente.color_carrera }"
                      text-color="white"
                    >
                      {{ residente.abrev_carrera }}
                    </q-chip>
                    <q-chip
                      dense
                      color="secondary"
                      text-color="white"
                      icon="call"
                    >
                      {{ residente.telefono_estudiante }}
                    </q-chip>
                  </div>
                </div>
              </div>
            </td>
            <td class="columna-ancho-maximo">
              <div class="flex column">
                {{ residente.nombre_empresa }}
                <q-chip dense color="secondary" text-color="white" icon="call">
                  {{ residente.telefono_empresa }}
                </q-chip>
              </div>
            </td>

            <td class="columna-ancho-maximo">
              <div class="flex column">
                {{ residente.proyecto }}
                <div>
                  <q-chip
                    dense
                    color="deep-purple"
                    text-color="white"
                    icon="checklist"
                  >
                    {{ residente.tipo_proyecto }}
                  </q-chip>
                  <q-chip
                    v-if="residente.nombre_asesor"
                    dense
                    color="light-blue-10"
                    text-color="white"
                    icon="supervisor_account"
                  >
                    {{ residente.nombre_asesor }}
                  </q-chip>
                  <q-chip
                    v-else
                    dense
                    color="orange"
                    text-color="white"
                    icon="block"
                  >
                    No hay asesor asignado
                  </q-chip>
                </div>
              </div>
            </td>
            <td>
              <q-circular-progress
                show-value
                font-size="12px"
                :value="
                  porcentajeCalc(
                    residente.documentos_entregados,
                    residente.total_documentos
                  )
                "
                size="50px"
                :thickness="0.22"
                color="primary"
                track-color="grey-3"
                class="q-ma-md"
              >
                {{
                  porcentajeCalc(
                    residente.documentos_entregados,
                    residente.total_documentos
                  )
                }}%
              </q-circular-progress>
            </td>
            <td>
              <q-btn-group push>
                <q-btn
                  size="sm"
                  color="info"
                  push
                  glossy
                  icon="visibility"
                  @click="verResidente(residente.id_estudiante)"
                />
                <q-btn
                  size="sm"
                  color="secondary"
                  push
                  glossy
                  icon="edit"
                  @click="editarResidente(residente.id_estudiante)"
                />
                <q-btn
                  size="sm"
                  color="negative"
                  push
                  glossy
                  icon="block"
                  @click="eliminar(residente.id_estudiante)"
                />
              </q-btn-group>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<style scoped>
.columna-ancho-maximo {
  max-width: 200px; /* Puedes ajustar el valor según tus necesidades */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
