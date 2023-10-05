<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';
import useObtenerEmpresas from '../composables/useObtenerEmpresas';
import useEliminarEmpresa from '../composables/useEliminarEmpresa';
import { columnasEmpresas as columns } from '../composables/columnasEmpresas';

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { data: empresas, isLoading } = useObtenerEmpresas();
const { eliminarRecurso: eliminarEmpresa } = useEliminarEmpresa();

const verEmpresa = (id: string) => {
  router.push({ name: 'ver-empresa', params: { id } });
};
const editarEmpresa = (id: string) => {
  router.push({ name: 'editar-empresa', params: { id } });
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
      @eliminar="eliminarEmpresa"
    />
    <q-table
      flat
      bordered
      :rows="empresas"
      :columns="columns"
      row-key="nombre"
      :loading="isLoading"
      :pagination="{ rowsPerPage: 15 }"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
          <q-td key="giro" :props="props">{{ props.row.giro }}</q-td>
          <q-td key="telefono" :props="props">{{ props.row.telefono }}</q-td>
          <q-td key="domicilio" :props="props">{{ props.row.domicilio }}</q-td>
          <q-td key="titular" :props="props">{{ props.row.titular }}</q-td>
          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="info"
                push
                glossy
                icon="visibility"
                @click="verEmpresa(props.row.id)"
              />
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="edit"
                @click="editarEmpresa(props.row.id)"
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
