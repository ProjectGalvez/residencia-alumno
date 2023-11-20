<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useObtenerPeriodos from '../composables/useObtenerPeriodos';
import useEliminarPeriodo from '../composables/useEliminarPeriodo';
import { columnasPeriodos as columns } from '../composables/columnasPeriodos';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { data: periodos, isLoading } = useObtenerPeriodos();
const { eliminarRecurso: eliminarPeriodo } = useEliminarPeriodo();

const verPeriodo = (id: string) => {
  router.push({ name: 'ver-periodo', params: { id } });
};
const editarPeriodo = (id: string) => {
  router.push({ name: 'editar-periodo', params: { id } });
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
      @eliminar="eliminarPeriodo"
    />
    <q-table
      flat
      bordered
      :rows="periodos"
      :columns="columns"
      row-key="nombre"
      :loading="isLoading"
      :pagination="{ rowsPerPage: 15 }"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
          <q-td key="fecha_inicio" :props="props">{{
            props.row.fecha_inicio
          }}</q-td>
          <q-td key="fecha_termino" :props="props">{{
            props.row.fecha_termino
          }}</q-td>
          <q-td key="fecha_termino" :props="props">
            <q-chip
              v-if="props.row.activo"
              dense
              icon="check_circle"
              color="green"
              text-color="white"
              >En proceso</q-chip
            >
            <q-chip v-else dense icon="block" text-color="white" color="red"
              >Inactivo</q-chip
            >
          </q-td>
          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="info"
                push
                glossy
                icon="visibility"
                @click="verPeriodo(props.row.id)"
              />
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="edit"
                @click="editarPeriodo(props.row.id)"
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
