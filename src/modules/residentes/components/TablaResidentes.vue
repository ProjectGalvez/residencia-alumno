<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Residente } from 'src/modules/model/Model';
import DialogEliminar from '../../../shared/components/DialogEliminar.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useCancelarResidencia from '../composables/useCancelarResidencia';

const getResidentes = async (page: Ref<number>): Promise<Residente[]> => {
  const { data } = await documentosApi.get<Residente[]>('/residentes', {
    params: {
      page: page.value,
    },
  });
  return data;
};

const page = ref(1);
const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { isLoading, data: residentes } = useQuery({
  queryKey: ['residentes', page],
  queryFn: () => getResidentes(page),
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
          <tr v-for="residente in residentes" :key="residente.estudiante_id">
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
                    <q-chip dense text-color="white" icon="call">
                      {{ residente.telefono_estudiante }}
                    </q-chip>
                  </div>
                </div>
              </div>
            </td>
            <td class="columna-ancho-maximo">{{ residente.nombre_empresa }}</td>
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
                <q-btn
                  size="sm"
                  color="secondary"
                  push
                  glossy
                  icon="edit"
                  @click="editarResidente(residente.estudiante_id)"
                />
                <q-btn
                  size="sm"
                  color="negative"
                  push
                  glossy
                  icon="block"
                  @click="eliminar(residente.estudiante_id)"
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
