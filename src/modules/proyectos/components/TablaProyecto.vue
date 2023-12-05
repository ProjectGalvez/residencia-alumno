<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import documentosApi from 'src/api/documentosApi';
import { ProyectoPaginado } from 'src/modules/model/Model';
import { useQuery } from '@tanstack/vue-query';
import useEliminarProyecto from '../composables/useEliminarProyecto';

const router = useRouter();
const confirm = ref(false);
const recursoId = ref();
const page = ref(1);

const fetcher = async (page: Ref<number>): Promise<ProyectoPaginado> => {
  const { data } = await documentosApi.get<ProyectoPaginado>('/proyectos', {
    params: {
      page: page.value,
      perPage: 15,
      included: 'carrera',
    },
  });
  return data;
};
const { isLoading, data } = useQuery({
  queryKey: ['proyectos', page],
  queryFn: () => fetcher(page),
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60,
});
const { eliminarRecurso } = useEliminarProyecto();

const eliminar = (id: number) => {
  confirm.value = true;
  recursoId.value = id;
};
const verProyecto = (id: number) => {
  router.push({ name: 'ver-proyecto', params: { id } });
};
const editarProyecto = (id: number) => {
  router.push({ name: 'editar-proyecto', params: { id } });
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
            <td>Nombre del proyecto</td>
            <td>Tipo</td>
            <td>Carrera</td>
            <td>Acción</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proyecto in data.data" :key="proyecto.id">
            <td>{{ proyecto.nombre }}</td>
            <td>{{ proyecto.tipo }}</td>
            <td>{{ proyecto.carrera?.nombre }}</td>
            <td>
              <q-btn-group push>
                <q-btn
                  size="sm"
                  color="info"
                  push
                  glossy
                  icon="visibility"
                  @click="verProyecto(proyecto.id)"
                />
                <q-btn
                  size="sm"
                  color="secondary"
                  push
                  glossy
                  icon="edit"
                  @click="editarProyecto(proyecto.id)"
                />
                <q-btn
                  size="sm"
                  color="negative"
                  push
                  glossy
                  icon="delete"
                  @click="eliminar(proyecto.id)"
                />
              </q-btn-group>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div class="q-mt-xs flex justify-end items-center q-gutter-md">
        <div>Mostrando {{ data.meta.to }} de {{ data.meta.total }}</div>
        <q-pagination
          v-model="page"
          :max="data.meta.last_page"
          :max-pages="6"
          direction-links
          push
          color="teal"
          active-design="push"
          active-color="orange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
