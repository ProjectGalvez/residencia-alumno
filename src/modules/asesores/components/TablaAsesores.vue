<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import documentosApi from 'src/api/documentosApi';
import { useQuery } from '@tanstack/vue-query';

import { AsesorPaginado } from 'src/modules/model/Model';
import useEliminarAsesor from '../composables/useEliminarAsesor';

const router = useRouter();
const confirm = ref(false);
const recursoId = ref();
const page = ref(1);

const fetcher = async (page: Ref<number>): Promise<AsesorPaginado> => {
  const { data } = await documentosApi.get<AsesorPaginado>('/asesores', {
    params: {
      page: page.value,
      perPage: 15,
    },
  });
  return data;
};
const { isLoading, data } = useQuery({
  queryKey: ['asesores', page],
  queryFn: () => fetcher(page),
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60,
});
const { eliminarRecurso } = useEliminarAsesor();

const eliminar = (id: number) => {
  confirm.value = true;
  recursoId.value = id;
};
const verAsesor = (id: number) => {
  router.push({ name: 'ver-asesor', params: { id } });
};
const editarAsesor = (id: number) => {
  router.push({ name: 'editar-asesor', params: { id } });
};
</script>

<template>
  <div>
    <DialogEliminar
      v-model="confirm"
      :recurso-id="recursoId"
      @eliminar="eliminarRecurso"
    />
    <LoaderSpinner v-if="isLoading" />
    <div v-else-if="data?.data">
      <q-markup-table>
        <thead>
          <tr>
            <td>Asesor</td>
            <td>Teléfono</td>
            <td>Email</td>
            <td>Acción</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asesor in data.data" :key="asesor.id">
            <td>{{ asesor.nombre }} {{ asesor.apellidos }}</td>
            <td>{{ asesor.telefono }}</td>
            <td>{{ asesor.email }}</td>
            <td>
              <q-btn-group push>
                <q-btn
                  size="sm"
                  color="info"
                  push
                  glossy
                  icon="visibility"
                  @click="verAsesor(asesor.id)"
                />
                <q-btn
                  size="sm"
                  color="secondary"
                  push
                  glossy
                  icon="edit"
                  @click="editarAsesor(asesor.id)"
                />
                <q-btn
                  size="sm"
                  color="negative"
                  push
                  glossy
                  icon="delete"
                  @click="eliminar(asesor.id)"
                />
              </q-btn-group>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<style scoped></style>
