<script setup lang="ts">
import BotonDictamen from './BotonDictamen.vue';
import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Residente } from 'src/modules/model/Model';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useObtenerPeriodos from 'src/modules/periodos/composables/useObtenerPeriodos';
import { toRef, ref, Ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import BotonPublicacionResultados from './BotonPublicacionResultados.vue';

const props = defineProps<{ id: number }>();
const id = toRef(props, 'id');
const periodoId = ref('');

const { data: periodos, isLoading: isLoadingPeriodos } = useObtenerPeriodos();

const getResidentes = async (periodoId: Ref): Promise<Residente[]> => {
  let url = '/residentes-por-carrera/' + id.value;
  if (periodoId.value) {
    url += `?periodoId=${periodoId.value}`;
  }
  const { data } = await documentosApi.get<Residente[]>(url);
  return data;
};

const {
  isLoading,
  data: residentes,
  refetch,
} = useQuery({
  queryKey: ['residentes', id.value],
  queryFn: () => getResidentes(periodoId),
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60,
});

watch(periodoId, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await refetch();
  }
});

const porcentajeCalc = (entregados = 0, documentos = 0): number => {
  if (documentos === 0) {
    return 0;
  }

  const porcentaje = (entregados / documentos) * 100;
  return Math.round(porcentaje);
};

const router = useRouter();
const verResidente = (idResidente: string) => {
  router.push({ name: 'ver-residente', params: { id: idResidente } });
};
const URL = `${process.env.SERVER_URL}`;
const pdf = () => {
  const exportURL = URL + '/residentes-export-pdf-carrera/' + id.value;
  window.open(exportURL, '_blank');
};
</script>

<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="fontsize-11">Residentes en el periodo actual</div>
      </q-card-section>
      <q-card-section>
        <div class="flex justify-end q-pa-md">
          <q-select
            style="width: 300px"
            v-model="periodoId"
            :options="periodos"
            label="Selecciona un periodo"
            option-value="id"
            option-label="nombre"
            :loading="isLoadingPeriodos"
            emit-value
            map-options
          >
          </q-select>
        </div>

        <loader-spinner v-if="isLoading" />
        <div v-if="residentes && residentes.length > 0">
          <div class="flex justify-end">
            <div>
              <BotonDictamen :carrera_id="id" :periodo_id="periodoId" />
              <BotonPublicacionResultados
                :carrera_id="id"
                :periodo_id="periodoId"
              />

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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="residente in residentes"
                :key="residente.estudiante_id"
              >
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
                          :style="{
                            backgroundColor: residente.color_carrera,
                          }"
                          text-color="white"
                        >
                          {{ residente.nombre_carrera }}
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
                    <q-chip
                      dense
                      color="secondary"
                      text-color="white"
                      icon="call"
                    >
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
                  <q-btn-group push>
                    <q-btn
                      size="sm"
                      color="info"
                      push
                      glossy
                      icon="visibility"
                      @click="verResidente(residente.estudiante_id)"
                    />
                  </q-btn-group>
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
              </tr>
            </tbody>
          </q-markup-table>
          <div class="flex justify-end">
            <div class="q-pt-sm fontsize-11">
              {{ residentes.length }} residentes
            </div>
          </div>
        </div>
        <div v-else-if="residentes && residentes.length === 0">
          <div class="fontsize-11">
            No hay residentes de esta carrera en este periodo
          </div>
        </div>
      </q-card-section>
    </q-card>
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
