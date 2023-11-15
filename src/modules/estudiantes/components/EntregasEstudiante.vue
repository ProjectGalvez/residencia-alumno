<script setup lang="ts">
import { toRef, ref } from 'vue';
import useEtregaPorEstudiante from '../composables/useEtregaPorEstudiante';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRouter } from 'vue-router';
import useEliminarEntregaEstudiante from 'src/modules/entregas/composables/useEliminarEntregaEstudiante';
import DialogEliminar from 'src/shared/components/DialogEliminar.vue';
import { date } from 'quasar';

const props = defineProps<{ id: string }>();
const id = toRef(props, 'id');
const { isLoading, data } = useEtregaPorEstudiante(id.value);

const router = useRouter();
const confirm = ref(false);
const recursoId = ref('');

const { eliminarRecurso: eliminarEntrega } = useEliminarEntregaEstudiante();

const verEntrega = (id: string) => {
  router.push({ name: 'ver-entrega', params: { id } });
};
const editarEntrega = (id: string) => {
  router.push({ name: 'editar-entrega', params: { id } });
};
const eliminar = (id: string) => {
  confirm.value = true;
  recursoId.value = id;
};
</script>

<template>
  <DialogEliminar
    v-model="confirm"
    :recurso-id="recursoId"
    @eliminar="eliminarEntrega"
  />
  <div class="q-px-lg q-py-md">
    <div class="fontsize-14 text-center text-weight-light flex items-center">
      <q-icon name="post_add" class="q-mr-xs" />
      Documentos entregados
    </div>
    <LoaderSpinner v-if="isLoading" />
    <q-timeline v-else-if="data" color="secondary">
      <div v-if="data.length === 0">No hay documentos agregados aún</div>
      <q-timeline-entry
        v-else
        v-for="entrega in data"
        :key="entrega.Id"
        :title="entrega.NombreDocumento"
        :subtitle="entrega.FechaEntrega.toString()"
        :icon="entrega.Icono"
      >
        <div>
          Entrega de {{ entrega.NombreDocumento }}
          <span v-if="entrega.URLDocumento">
            <a :href="entrega.URLDocumento">Descargar archivo</a>
          </span>
          <div class="flex justify-end">
            <q-btn-group push>
              <q-btn
                size="sm"
                color="info"
                push
                glossy
                icon="visibility"
                @click="verEntrega(entrega.Id)"
              />
              <q-btn
                size="sm"
                color="secondary"
                push
                glossy
                icon="edit"
                @click="editarEntrega(entrega.Id)"
              />
              <q-btn
                size="sm"
                color="negative"
                push
                glossy
                icon="delete"
                @click="eliminar(entrega.Id)"
              />
            </q-btn-group>
          </div>
        </div>
      </q-timeline-entry>
    </q-timeline>
    <div v-else>No hay documentos entregados</div>
  </div>
</template>

<style scoped></style>
