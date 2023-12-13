<script setup lang="ts">
import { toRef } from 'vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { Area } from 'src/modules/model/Model';
import documentosApi from 'src/api/documentosApi';
import { useQuery } from '@tanstack/vue-query';

const props = defineProps<{
  empresa_id: string;
}>();
const empresa_id = toRef(props, 'empresa_id');

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
</script>
<template>
  <LoaderSpinner v-if="isLoading" />
  <q-markup-table v-else-if="areas">
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
        <td></td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<style scoped></style>
