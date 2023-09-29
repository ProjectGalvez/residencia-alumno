<script setup lang="ts">
import { ref } from 'vue';
import { date } from 'quasar';
import useEliminadosDocumento from '../composables/useEliminadosDocumento';
import forzarEliminacionDocumento from '../composables/useForzarEliminacionDocumento';
import useRestaurarDocumento from '../composables/useRestaurarDocumento';
import { Documento } from 'src/modules/model/Model';
import { columnasDocumentos as columns } from '../composables/columnasDocumentos';
import DialogEliminar from '../../../shared/components/DialogEliminar.vue';

const selected = ref<Documento[]>([]);
const confirmMultiple = ref(false);
const confirm = ref(false);
const recursoId = ref('');

const { data: documentos, isLoading } = useEliminadosDocumento();
const { eliminarRecurso: eliminarDocumento } = forzarEliminacionDocumento();
const { restaurarRecurso: restaurarDocumento } = useRestaurarDocumento();

const eliminarRecurso = (id: string | number | string[]) => {
  eliminarDocumento(id);
};
const openPopUpEliminarMultiple = () => {
  confirmMultiple.value = true;
};
const eliminar = (id: string) => {
  confirm.value = true;
  recursoId.value = id;
};

const restaurarVarios = () => {
  const ids: string[] = selected.value.map((departamento) =>
    departamento.id.toString()
  );
  restaurarDocumento(ids);
  selected.value = [];
};

const eliminarVarios = () => {
  const ids: string[] = selected.value.map((departamento) =>
    departamento.id.toString()
  );
  eliminarDocumento(ids);
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
      mensaje="¿Estas seguro de eliminar este documento? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piensalo!"
    />
    <DialogEliminar
      v-model="confirmMultiple"
      :recurso-id="selected"
      icon="delete_forever"
      @eliminar="eliminarVarios"
      mensaje="¿Estas seguro de eliminar estos documentos? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piénsalo!"
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
      :rows="documentos"
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
          <q-td key="nombre" :props="props">{{
            props.row.nombre_documento
          }}</q-td>
          <q-td key="abrev_nombre" :props="props">{{
            props.row.abrev_nombre
          }}</q-td>
          <q-td key="fecha_limite" :props="props">{{
            date.formatDate(props.row.fecha_limite, 'DD/MM/YYYY')
          }}</q-td>
          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="restore"
                @click="restaurarDocumento(props.row.id)"
              >
                <q-tooltip> Restaurar documento </q-tooltip>
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
