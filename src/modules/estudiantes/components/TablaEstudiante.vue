<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';
import { columnasEstudiantes as columns } from '../composables/columnasEstudiantes';
import useEliminarEstudiante from '../composables/useEliminarEstudiante';
import documentosApi from 'src/api/documentosApi';

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const rows = ref([]);
const tableRef = ref();
const pagination = ref({
  sortBy: 'nombre',
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
});
const filter = ref('');
const loading = ref(false);

//const { data: estudiantes, isLoading } = useObtenerEstudiantes();
const { eliminarRecurso: eliminarEstudiante } = useEliminarEstudiante();

const verEstudiante = (id: string) => {
  router.push({ name: 'ver-estudiante', params: { id } });
};
const editarEstudiante = (id: string) => {
  router.push({ name: 'editar-estudiante', params: { id } });
};
const eliminar = (id: string) => {
  confirm.value = true;
  recursoId.value = id;
};

const onRequest = async (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;
  loading.value = true;
  const { data } = await documentosApi.get('/estudiantes', {
    params: {
      perPage: rowsPerPage,
      page: page,
      sort: sortBy,
      'filter[nombre]': filter,
      'filter[numero_control]': filter,
      'filter[apellidos]': filter,
      included: 'carrera',
    },
  });
  rows.value = data.data;
  rows.value.splice(0, rows.value.length, ...data.data);
  pagination.value.rowsNumber = data.meta.total;
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;

  // ...and turn of loading indicator
  loading.value = false;
};

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction();
});
</script>

<template>
  <div>
    <DialogEliminar
      v-model="confirm"
      :recurso-id="recursoId"
      @eliminar="eliminarEstudiante"
    />
    <q-table
      flat
      ref="tableRef"
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      v-model:pagination="pagination"
      :filter="filter"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props"
            >{{ props.row.nombre }} {{ props.row.apellidos }}</q-td
          >
          <q-td key="nombre" :props="props">{{
            props.row.numero_control
          }}</q-td>
          <q-td key="nombre" :props="props">
            <span v-if="props.row.carrera">
              {{ props.row.carrera.nombre }}</span
            >
          </q-td>
          <q-td key="nombre" :props="props">{{ props.row.telefono }}</q-td>
          <q-td key="accion" :props="props">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="info"
                push
                glossy
                icon="visibility"
                @click="verEstudiante(props.row.id)"
              />
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="edit"
                @click="editarEstudiante(props.row.id)"
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
