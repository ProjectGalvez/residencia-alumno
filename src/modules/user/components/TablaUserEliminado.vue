<script setup lang="ts">
import { ref } from 'vue';
import { User } from 'src/modules/model/Model';
import { columnasUsers as columns } from '../composables/columnasUsuarios';
import DialogEliminar from '../../../shared/components/DialogEliminar.vue';
import useEliminadosUser from '../composables/useEliminadosUser';
import useForzarEliminacionUser from '../composables/useForzarEliminacionUser';
import useRestaurarUser from '../composables/useRestaurarUser';

const selected = ref<User[]>([]);
const confirmMultiple = ref(false);
const confirm = ref(false);
const recursoId = ref('');

const { data: users, isLoading } = useEliminadosUser();
const { eliminarRecurso: eliminarUser } = useForzarEliminacionUser();
const { restaurarRecurso: restaurarUser } = useRestaurarUser();

const eliminarRecurso = (id: string | number | string[]) => {
  eliminarUser(id);
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
  restaurarUser(ids);
  selected.value = [];
};

const eliminarVarios = () => {
  const ids: string[] = selected.value.map((departamento) =>
    departamento.id.toString()
  );
  eliminarUser(ids);
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
      mensaje="¿Estas seguro de eliminar este usuario? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piensalo!"
    />
    <DialogEliminar
      v-model="confirmMultiple"
      :recurso-id="selected"
      icon="delete_forever"
      @eliminar="eliminarVarios"
      mensaje="¿Estas seguro de eliminar estos usuarios? Si se llega a eliminar, todos los datos se perderán para simpre y por simpre. ¡Piénsalo!"
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
      :rows="users"
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
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="rol" :props="props">
            <div v-if="props.row.roles && props.row.roles.length > 0">
              {{ props.row.roles[0].name }}
            </div>
            <div v-else>Sin rol</div>
          </q-td>

          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="restore"
                @click="restaurarUser(props.row.id)"
              >
                <q-tooltip> Restaurar usuario </q-tooltip>
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
