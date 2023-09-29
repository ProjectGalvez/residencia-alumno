<script setup lang="ts">
import { ref } from 'vue';
import { Carrera } from 'src/modules/model/Model';
import useEliminadosCarrera from '../composables/useEliminadosCarrera';
import { columns } from '../composables/columnasCarreras';
import DialogEliminar from '../../../shared/components/DialogEliminar.vue';
import useForzarEliminacionCarrera from '../composables/useForzarEliminacionCarrera';
import useRestaurarCarrera from '../composables/useRestaurarCarrera';

const selected = ref<Carrera[]>([]);
const confirmMultiple = ref(false);
const confirm = ref(false);
const recursoId = ref('');

const { data: carreras, isLoading } = useEliminadosCarrera();
const { eliminarRecurso: eliminarCarrera } = useForzarEliminacionCarrera();
const { restaurarRecurso: restaurarCarrera } = useRestaurarCarrera();

const eliminarRecurso = (id: string | number | string[]) => {
  eliminarCarrera(id);
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
  restaurarCarrera(ids);
  selected.value = [];
};

const eliminarVarios = () => {
  const ids: string[] = selected.value.map((departamento) =>
    departamento.id.toString()
  );
  eliminarCarrera(ids);
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
      mensaje="¿Estas seguro de eliminar esta carrera? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piensalo!"
    />
    <DialogEliminar
      v-model="confirmMultiple"
      :recurso-id="selected"
      icon="delete_forever"
      @eliminar="eliminarVarios"
      mensaje="¿Estas seguro de eliminar estas carreras? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piénsalo!"
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
      :rows="carreras"
      :columns="columns"
      row-key="id"
      :loading="isLoading"
      :pagination="{ rowsPerPage: 10 }"
      selection="multiple"
      v-model:selected="selected"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td> <q-checkbox v-model="props.selected" /> </q-td>
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
                color="secondary"
                push
                glossy
                icon="restore"
                @click="restaurarCarrera(props.row.id)"
              >
                <q-tooltip> Restaurar carrera </q-tooltip>
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
