<script setup lang="ts">
import { ref } from 'vue';

import useEliminadosDepartamento from '../composables/useEliminadosDepartamento';
import useEliminarForzadoDepartamento from '../composables/useEliminarForzadoDepartamento';
import { columnasDepartamentos as columns } from '../composables/columnasDepartamentos';
import { Departamento } from 'src/modules/model/Model';
import useRestaurarDepartamento from '../composables/useRestaurarDepartamento';

const selected = ref<Departamento[]>([]);
const confirmMultiple = ref(false);
const confirm = ref(false);
const selectDepto = ref('');

const { departamentosElimnados, isLoading, isSuccess, error } =
  useEliminadosDepartamento();
const { eliminarDepartamento } = useEliminarForzadoDepartamento();
const { restaurarRecurso: restaurarDepartamento } = useRestaurarDepartamento();

const eliminarVarios = () => {
  const ids: string[] = selected.value.map((departamento) =>
    departamento.id.toString()
  );
  eliminarDepartamento(ids);
  selected.value = [];
};

const restaurarVarios = () => {
  const ids: string[] = selected.value.map((departamento) =>
    departamento.id.toString()
  );
  restaurarDepartamento(ids);
  selected.value = [];
};

const getSelectedString = () => {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} registro${
        selected.value.length > 1 ? 's' : ''
      } seleccionado`;
};

const openPopUpEliminarMultiple = () => {
  confirmMultiple.value = true;
};
const openPopUpEliminar = (row: string) => {
  selectDepto.value = row;
  confirm.value = true;
};
const eliminar = (id: string) => {
  eliminarDepartamento(id);
};
</script>
<template>
  <div v-if="!isSuccess">{{ error }}</div>
  <div v-else>
    <q-dialog v-model="confirmMultiple" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="negative" text-color="white" />
          <span class="q-ml-sm"
            >¿Estas seguro que quieres eliminar definitivamente estos
            departamentos?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="negative"
            v-close-popup
            @click="eliminarVarios"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="negative" text-color="white" />
          <span class="q-ml-sm"
            >¿Estas seguro que quieres eliminar definitivamente este
            departamento?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="negative"
            v-close-popup
            @click="eliminar(selectDepto)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
      bordered
      :rows="departamentosElimnados"
      :columns="columns"
      row-key="id"
      :loading="isLoading"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :pagination="{ rowsPerPage: 15 }"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td> <q-checkbox v-model="props.selected" /> </q-td>
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
                color="secondary"
                push
                glossy
                icon="restore"
                @click="restaurarDepartamento(props.row.id)"
              >
                <q-tooltip> Restaurar departamento </q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="negative"
                push
                glossy
                icon="delete_forever"
                @click="openPopUpEliminar(props.row.id)"
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
