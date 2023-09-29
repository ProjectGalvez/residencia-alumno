<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useObtenerDocumentos from '../composables/useObtenerDocumentos';
import { columnasDocumentos as columns } from '../composables/columnasDocumentos';
import useEliminarDocumento from '../composables/useEliminarDocumento';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { data: documentos, isLoading } = useObtenerDocumentos();
const { eliminarRecurso: eliminarDocumento } = useEliminarDocumento();

const verDocumento = (id: string) => {
  router.push({ name: 'ver-documento', params: { id } });
};
const editarDocumento = (id: string) => {
  router.push({ name: 'editar-documento', params: { id } });
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
      @eliminar="eliminarDocumento"
    />
    <q-table
      flat
      bordered
      :rows="documentos"
      :columns="columns"
      row-key="name"
      :loading="isLoading"
      :pagination="{ rowsPerPage: 15 }"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">{{
            props.row.nombre_documento
          }}</q-td>
          <q-td key="abrev_nombre" :props="props">{{
            props.row.abrev_nombre
          }}</q-td>
          <q-td key="fecha_limite" :props="props">{{
            props.row.fecha_limite
          }}</q-td>
          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="info"
                push
                glossy
                icon="visibility"
                @click="verDocumento(props.row.id)"
              />
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="edit"
                @click="editarDocumento(props.row.id)"
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
