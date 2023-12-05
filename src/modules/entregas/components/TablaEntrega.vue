<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { EntregaPaginado } from 'src/modules/model/Model';
import documentosApi from 'src/api/documentosApi';
import DialogEliminar from '../../../shared/components/DialogEliminar.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useEliminarEntrega from '../composables/useEliminarEntrega';

const fetcher = async (page: Ref<number>): Promise<EntregaPaginado> => {
  const { data } = await documentosApi.get<EntregaPaginado>('/entregas', {
    params: {
      page: page.value,
      perPage: 15,
      included: 'estudiante,documento',
    },
  });
  return data;
};
const page = ref(1);

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { isLoading, data } = useQuery({
  queryKey: ['entregas', page],
  queryFn: () => fetcher(page),
  keepPreviousData: true,
  staleTime: 1000 * 60 * 10,
});
const { eliminarRecurso: eliminarEntrega } = useEliminarEntrega(page.value);

const verEntrega = (id: string) => {
  router.push({ name: 'ver-entrega', params: { id } });
};
const editarEntrega = (id: string) => {
  router.push({ name: 'editar-entrega', params: { id } });
};
const eliminar = (id: string) => {
  confirm.value = true;
  recursoId.value = id;
};
</script>
<template>
  <div>
    <DialogEliminar
      v-model="confirm"
      :recurso-id="recursoId"
      @eliminar="eliminarEntrega"
    />
    <LoaderSpinner v-if="isLoading" />
    <q-markup-table v-else-if="data">
      <thead>
        <tr>
          <th>Residente</th>
          <th>Fecha entrega</th>
          <th>Documento</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entrega in data?.data" :key="entrega.id">
          <td>
            {{ entrega.estudiante?.nombre }} {{ entrega.estudiante?.apellidos }}
          </td>
          <td>
            {{ entrega.fecha_entrega }}
          </td>
          <td>{{ entrega.documento?.nombre_documento }}</td>
          <td>
            <q-btn-group push>
              <q-btn
                size="sm"
                color="info"
                push
                glossy
                icon="visibility"
                @click="verEntrega(entrega.id)"
              />
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="edit"
                @click="editarEntrega(entrega.id)"
              />
              <q-btn
                size="sm"
                color="negative"
                push
                glossy
                icon="delete"
                @click="eliminar(entrega.id)"
              />
            </q-btn-group>
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <div class="q-mt-md flex justify-end items-center">
      <div class="q-mr-md">Página: {{ page }}</div>
      <q-pagination
        v-model="page"
        :max="data?.meta.last_page || 1"
        direction-links
        flat
        color="grey"
        active-color="primary"
      />
    </div>
  </div>
</template>

<style scoped></style>
