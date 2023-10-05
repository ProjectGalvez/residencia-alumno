<script setup lang="ts">
import { ref } from 'vue';
import { Empresa } from 'src/modules/model/Model';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';
import { columnasEmpresas as columns } from '../composables/columnasEmpresas';
import useEliminadosEmpresa from '../composables/useEliminadosEmpresa';
import useForzarEliminacionEmpresa from '../composables/useForzarEliminacionEmpresa';
import useRestaurarEmpresa from '../composables/useRestaurarEmpresa';

const selected = ref<Empresa[]>([]);
const confirmMultiple = ref(false);
const confirm = ref(false);
const recursoId = ref('');

const { data: empresas, isLoading } = useEliminadosEmpresa();
const { eliminarRecurso: eliminarEmpresa } = useForzarEliminacionEmpresa();
const { restaurarRecurso: restaurarEmpresa } = useRestaurarEmpresa();

const eliminarRecurso = (id: string | number | string[]) => {
  eliminarEmpresa(id);
};

const openPopUpEliminarMultiple = () => {
  confirmMultiple.value = true;
};
const eliminar = (id: string) => {
  confirm.value = true;
  recursoId.value = id;
};
const restaurarVarios = () => {
  const ids: string[] = selected.value.map((empresa) => empresa.id.toString());
  restaurarEmpresa(ids);
  selected.value = [];
};

const eliminarVarios = () => {
  const ids: string[] = selected.value.map((empresa) => empresa.id.toString());
  eliminarEmpresa(ids);
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
      mensaje="¿Estas seguro de eliminar esta empresa? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piensalo!"
    />
    <DialogEliminar
      v-model="confirmMultiple"
      :recurso-id="selected"
      icon="delete_forever"
      @eliminar="eliminarVarios"
      mensaje="¿Estas seguro de eliminar estas empresas? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piénsalo!"
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
      :rows="empresas"
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
          <q-td key="giro" :props="props">{{ props.row.giro }}</q-td>
          <q-td key="telefono" :props="props">{{ props.row.telefono }}</q-td>
          <q-td key="domicilio" :props="props">{{ props.row.domicilio }}</q-td>
          <q-td key="titular" :props="props">{{ props.row.titular }}</q-td>
          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="restore"
                @click="restaurarEmpresa(props.row.id)"
              >
                <q-tooltip> Restaurar empresa </q-tooltip>
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
