<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Residente } from 'src/modules/model/Model';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { toRef } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ id: number }>();
const id = toRef(props, 'id');

const getResidentes = async (): Promise<Residente[]> => {
  const { data } = await documentosApi.get<Residente[]>(
    '/residentes-por-carrera/' + id.value
  );
  return data;
};

const { isLoading, data: residentes } = useQuery({
  queryKey: ['residentes', id.value],
  queryFn: () => getResidentes(),
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60,
});

const router = useRouter();
const verResidente = (id: string) => {
  router.push({ name: 'ver-residente', params: { id } });
};
const URL = `${process.env.SERVER_URL}`;
const pdf = () => {
  const exportURL = URL + '/residentes-export-pdf-carrera/' + id.value;
  window.open(exportURL, '_blank');
};
</script>

<template>
  <div>
    <loader-spinner v-if="isLoading" />
    <div v-if="residentes && residentes.length > 0">
      <q-card>
        <q-card-section
          ><div class="fontsize-11">Residentes en el periodo actual</div>
        </q-card-section>
        <q-card-section>
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
                          :style="{ backgroundColor: residente.color_carrera }"
                          text-color="white"
                        >
                          {{ residente.nombre_carrera }}
                        </q-chip>
                        <q-chip
                          dense
                          color="teal"
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
                  {{ residente.nombre_empresa }}
                </td>
                <td class="columna-ancho-maximo">{{ residente.proyecto }}</td>
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
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </div>
    <div v-else-if="residentes && residentes.length === 0">
      <div class="fontsize-11">
        No hay residentes de esta carrera en este periodo
      </div>
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
