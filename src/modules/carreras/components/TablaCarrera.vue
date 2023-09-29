<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import DialogEliminar from '../../../shared/components/DialogEliminar.vue';
import useObtenerCarreras from '../composables/useObtenerCarreras';
import useEliminarCarrera from '../composables/useEliminarCarrera';
import { columns } from '../composables/columnasCarreras';

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');
const { data: carreras, isLoading } = useObtenerCarreras();

const verCarrera = (id: string) => {
  router.push({ name: 'ver-carrera', params: { id } });
};

const editarCarrera = (id: string) => {
  router.push({ name: 'editar-carrera', params: { id } });
};
const { eliminarRecurso } = useEliminarCarrera();
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
      @eliminar="eliminarRecurso"
    />
    <q-table
      flat
      bordered
      :rows="carreras"
      :columns="columns"
      row-key="name"
      :loading="isLoading"
      :pagination="{ rowsPerPage: 10 }"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
          <q-td key="clave" :props="props">{{ props.row.clave }}</q-td>
          <q-td key="departamento" :props="props">
            <div v-if="props.row.departamento">
              {{ props.row.departamento.nombre }}
            </div>
            <div v-else>No asignado</div>
          </q-td>
          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="info"
                push
                glossy
                icon="visibility"
                @click="verCarrera(props.row.id)"
              />
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="edit"
                @click="editarCarrera(props.row.id)"
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
  </div>
</template>

<style scoped></style>
