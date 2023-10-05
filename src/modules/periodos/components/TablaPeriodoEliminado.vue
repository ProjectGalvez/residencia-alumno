<script setup lang="ts">
import { ref } from 'vue';
import useEliminadosPeriodo from '../composables/useEliminadosPeriodo';
import useForzarEliminacionPeriodo from '../composables/useForzarEliminacionPeriodo';
import useRestaurarPeriodo from '../composables/useRestaurarPeriodo';
import { Periodo } from 'src/modules/model/Model';
import { columnasPeriodos as columns } from '../composables/columnasPeriodos';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';

const selected = ref<Periodo[]>([]);
const confirmMultiple = ref(false);
const confirm = ref(false);
const recursoId = ref('');

const { data: periodos, isLoading } = useEliminadosPeriodo();
const { eliminarRecurso: eliminarPeriodo } = useForzarEliminacionPeriodo();
const { restaurarRecurso: restaurarPeriodo } = useRestaurarPeriodo();

const eliminarRecurso = (id: string | number | string[]) => {
  eliminarPeriodo(id);
};
const openPopUpEliminarMultiple = () => {
  confirmMultiple.value = true;
};
const eliminar = (id: string) => {
  confirm.value = true;
  recursoId.value = id;
};
const restaurarVarios = () => {
  const ids: string[] = selected.value.map((periodo) => periodo.id.toString());
  restaurarPeriodo(ids);
  selected.value = [];
};

const eliminarVarios = () => {
  const ids: string[] = selected.value.map((periodo) => periodo.id.toString());
  eliminarPeriodo(ids);
  selected.value = [];
};
</script>
<template>
  <div>
    <DialogEliminar
      v-model="confirm"
      :recurso-id="recursoId"
      icon="delete_forever"
      @eliminar="eliminarRecurso"
      mensaje="¿Estas seguro de eliminar este periodo? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piensalo!"
    />
    <DialogEliminar
      v-model="confirmMultiple"
      :recurso-id="selected"
      icon="delete_forever"
      @eliminar="eliminarVarios"
      mensaje="¿Estas seguro de eliminar estos periodos? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piénsalo!"
    />

    <div class="flex justify-end q-gutter-md q-mb-md">
      <q-btn
        :disable="!selected.length"
        color="secondary"
        icon="restore"
        @click="restaurarVarios"
      />
      <q-btn
        :disable="!selected.length"
        color="negative"
        icon="delete_forever"
        @click="openPopUpEliminarMultiple"
      />
    </div>
    <q-table
      flat
      bordered
      :rows="periodos"
      :columns="columns"
      row-key="id"
      :loading="isLoading"
      :pagination="{ rowsPerPage: 15 }"
      selection="multiple"
      v-model:selected="selected"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td> <q-checkbox v-model="props.selected" /> </q-td>
          <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
          <q-td key="fecha_inicio" :props="props">{{
            props.row.fecha_inicio
          }}</q-td>
          <q-td key="fecha_termino" :props="props">{{
            props.row.fecha_termino
          }}</q-td>
          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="restore"
                @click="restaurarPeriodo(props.row.id)"
              >
                <q-tooltip> Restaurar periodo </q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="negative"
                push
                glossy
                icon="delete_forever"
                @click="eliminar(props.row.id)"
              >
                <q-tooltip> Forzar eliminación </q-tooltip>
              </q-btn>
            </q-btn-group>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
