<script setup lang="ts">
import DialogEliminar from '../../../shared/components/DialogEliminar.vue';
import BotonEditarArea from './BotonEditarArea.vue';
import { toRef, ref } from 'vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { Area } from 'src/modules/model/Model';
import documentosApi from 'src/api/documentosApi';
import { useQuery } from '@tanstack/vue-query';
import useEliminarArea from '../composables/useEliminarArea';

const props = defineProps<{
  empresa_id: string;
}>();
const empresa_id = toRef(props, 'empresa_id');
const confirm = ref(false);
const recursoId = ref(0);

const getAreas = async (empresaId: string): Promise<Area[]> => {
  const { data } = await documentosApi.get<Area[]>(
    '/areas-empresa/' + empresaId
  );
  return data;
};
const { isLoading, data: areas } = useQuery({
  queryKey: ['areas', empresa_id.value],
  queryFn: () => getAreas(empresa_id.value),
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60,
});
const { eliminarArea } = useEliminarArea(empresa_id.value);
const eliminar = (id: number) => {
  confirm.value = true;
  recursoId.value = id;
};
</script>
<template>
  <LoaderSpinner v-if="isLoading" />
  <div v-else-if="areas">
    <DialogEliminar
      v-model="confirm"
      :recurso-id="recursoId"
      @eliminar="eliminarArea"
    />
    <q-markup-table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Asesor externo</th>
          <th>Nombre del que firmará</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="area in areas" :key="area.id">
          <td>{{ area.nombre }}</td>
          <td>
            <div>{{ area.asesor_externo }}</div>
            <div>
              <small>{{ area.asesor_externo_puesto }}</small>
            </div>
          </td>
          <td>
            <div>{{ area.nombre_firmara }}</div>
            <div>
              <small>{{ area.nombre_firmara_puesto }}</small>
            </div>
          </td>
          <td>
            <q-btn-group push>
              <BotonEditarArea :area_id="area.id" />

              <q-btn
                size="sm"
                color="negative"
                push
                glossy
                icon="delete"
                @click="eliminar(area.id)"
              />
            </q-btn-group>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<style scoped></style>
