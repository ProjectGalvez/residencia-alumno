<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { EstudiantePaginado } from 'src/modules/model/Model';
import documentosApi from 'src/api/documentosApi';
import DialogEliminar from '../../../shared/components/DialogEliminar.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useForzarEliminacionEstudiante from '../composables/useForzarEliminacionEstudiante';
import useRestaurarEstudiante from '../composables/useRestaurarEstudiante';

const { eliminarRecurso: eliminarEstudiante } =
  useForzarEliminacionEstudiante();
const { restaurarRecurso } = useRestaurarEstudiante();

const fetcher = async (page: Ref<number>): Promise<EstudiantePaginado> => {
  const { data } = await documentosApi.get<EstudiantePaginado>(
    '/estudiantes-trashed',
    {
      params: {
        page: page.value,
        perPage: 15,
        included: 'carrera,user',
      },
    }
  );
  return data;
};

const page = ref(1);
const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { isLoading, data } = useQuery({
  queryKey: ['estudiantes-trashed', page],
  queryFn: () => fetcher(page),
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60,
});

const eliminar = (id: string) => {
  confirm.value = true;
  recursoId.value = id;
};
</script>

<template>
  <LoaderSpinner v-if="isLoading" />
  <div v-else-if="data">
    <DialogEliminar
      v-model="confirm"
      :recurso-id="recursoId"
      @eliminar="eliminarEstudiante"
    />
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Estudiante</th>
          <th class="text-left">Carrera</th>
          <th class="text-left">Teléfono</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="estudiante in data.data" :key="estudiante.id">
          <td class="text-left">
            <div class="flex items-center q-gutter-xs">
              <div>
                <q-avatar v-if="estudiante.user?.url_foto">
                  <img :src="estudiante.user?.url_foto" />
                </q-avatar>
                <q-avatar v-else color="primary" text-color="white">
                  {{ estudiante.nombre.charAt(0)
                  }}{{ estudiante.apellidos.charAt(0) }}
                </q-avatar>
              </div>
              <div>
                <div class="row">
                  {{ estudiante.nombre }} {{ estudiante.apellidos }}
                </div>
                <div class="row text-weight-medium">
                  {{ estudiante.email }}
                </div>
              </div>
            </div>
          </td>
          <td class="text-left">{{ estudiante.carrera?.nombre }}</td>
          <td class="text-left">{{ estudiante.telefono }}</td>
          <td>
            <q-btn-group push>
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="restore"
                @click="restaurarRecurso(estudiante.id)"
              />
              <q-btn
                size="sm"
                color="negative"
                push
                glossy
                icon="delete_forever"
                @click="eliminar(estudiante.id)"
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
</template>

<style scoped></style>
