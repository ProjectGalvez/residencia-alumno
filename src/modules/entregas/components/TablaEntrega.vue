<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { Entrega } from 'src/modules/model/Model';
import documentosApi from 'src/api/documentosApi';
import DialogEliminar from '../../../shared/components/DialogEliminar.vue';
import { columnasEntregas as columns } from '../composables/columnasEntregas';
import useEliminarEntrega from '../composables/useEliminarEntrega';

const fetcher = async (page: Ref<number>): Promise<Entrega[]> => {
  const { data } = await documentosApi.get<Entrega[]>('/entregas', {
    params: {
      page: page.value,
      perPage: 15,
      included: 'estudiante,documento',
    },
  });
  return data.data;
};
const page = ref(1);

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { isLoading, data, isPreviousData } = useQuery({
  queryKey: ['entregas', page],
  queryFn: () => fetcher(page),
  keepPreviousData: true,
});
const { eliminarRecurso: eliminarEntrega } = useEliminarEntrega(page.value);

const prevPage = () => {
  page.value = Math.max(page.value - 1, 1);
};
const nextPage = () => {
  if (!isPreviousData.value) {
    page.value = page.value + 1;
  }
};

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
    <div v-if="isLoading">Cargando</div>
    <q-table
      v-else-if="data"
      flat
      bordered
      :rows="data"
      :columns="columns"
      row-key="id"
      :loading="isLoading"
      hide-bottom
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="estudiante" :props="props">{{
            props.row.estudiante.nombre + ' ' + props.row.estudiante.apellidos
          }}</q-td>
          <q-td key="fecha_entrega" :props="props">{{
            props.row.fecha_entrega
          }}</q-td>
          <q-td key="documento" :props="props">{{
            props.row.documento.nombre_documento
          }}</q-td>
          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="info"
                push
                glossy
                icon="visibility"
                @click="verEntrega(props.row.id)"
              />
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="edit"
                @click="editarEntrega(props.row.id)"
              />
              <q-btn
                size="sm"
                color="negative"
                push
                glossy
                icon="delete"
                @click="eliminar(props.row.id)"
              />
            </q-btn-group>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="flex justify-end">
      <p>Página: {{ page }} | Previous data: {{ isPreviousData }}</p>
      <q-btn label="Anterior" @click="prevPage" />
      <q-btn label="Siguiente" @click="nextPage" />
    </div>
  </div>
</template>

<style scoped></style>
