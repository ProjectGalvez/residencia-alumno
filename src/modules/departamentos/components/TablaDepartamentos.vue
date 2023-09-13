<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import useObtenerDepartamentos from '../composables/useObtenerDepartamentos';
import useEliminarDepartmento from '../composables/useEliminarDepartmento';
import { columnasDepartamentos as columns } from '../composables/columnasDepartamentos';

const router = useRouter();
const confirm = ref(false);
const selectDepto = ref('');

const queryDepartamentos = useObtenerDepartamentos();
const { data: departamentos, isLoading } = queryDepartamentos;

const verDepartamento = (id: string) => {
  router.push({ name: 'ver-departamento', params: { id } });
};

const editarDepartamento = (id: string) => {
  router.push({ name: 'editar-departamento', params: { id } });
};

const { eliminarDepartamento } = useEliminarDepartmento();

const openPopUp = (row: string) => {
  selectDepto.value = row;
  confirm.value = true;
};
const eliminar = (id: string) => {
  eliminarDepartamento(id);
};
</script>

<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="negative" text-color="white" />
        <span class="q-ml-sm"
          >¿Estas seguro que quieres eliminar este departamento?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn
          flat
          label="Aceptar"
          color="primary"
          v-close-popup
          @click="eliminar(selectDepto)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-table
    flat
    bordered
    :rows="departamentos"
    :columns="columns"
    row-key="name"
    :loading="isLoading"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
        <q-td key="nombre_titular" :props="props">{{
          props.row.nombre_titular
        }}</q-td>
        <q-td key="apellidos_titular" :props="props">{{
          props.row.apellidos_titular
        }}</q-td>
        <q-td key="accion" :props="props">
          <q-btn-group push>
            <q-btn
              size="sm"
              color="info"
              push
              glossy
              icon="visibility"
              @click="verDepartamento(props.row.id)"
            >
              <q-tooltip> Ver departamento </q-tooltip>
            </q-btn>
            <q-btn
              size="sm"
              color="secondary"
              push
              glossy
              icon="edit"
              @click="editarDepartamento(props.row.id)"
            >
              <q-tooltip> Editar departamento </q-tooltip>
            </q-btn>
            <q-btn
              size="sm"
              color="negative"
              push
              glossy
              icon="delete"
              @click="openPopUp(props.row.id)"
            >
              <q-tooltip> Eliminar departamento </q-tooltip>
            </q-btn>
          </q-btn-group>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped></style>
