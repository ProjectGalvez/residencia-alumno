<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useObtenerUsers from '../composables/useObtenerUsers';
import { columnasUsers as columns } from '../composables/columnasUsuarios';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';
import useEliminarUser from '../composables/useEliminarUser';

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { data: users, isLoading } = useObtenerUsers();
const { eliminarRecurso: eliminarUser } = useEliminarUser();

const verUser = (id: string) => {
  router.push({ name: 'ver-usuario', params: { id } });
};
const editarUser = (id: string) => {
  router.push({ name: 'editar-usuario', params: { id } });
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
      @eliminar="eliminarUser"
    />
    <q-table
      flat
      bordered
      :rows="users"
      :columns="columns"
      row-key="name"
      :loading="isLoading"
      :pagination="{ rowsPerPage: 15 }"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
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
                color="info"
                push
                glossy
                icon="visibility"
                @click="verUser(props.row.id)"
              />
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="edit"
                @click="editarUser(props.row.id)"
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
