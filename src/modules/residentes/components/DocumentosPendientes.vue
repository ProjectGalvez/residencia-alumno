<script setup lang="ts">
import { toRef } from 'vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useDocumentosPendientes from '../composables/useDocumentosPendientes';

const props = defineProps<{ id: string }>();
const id = toRef(props, 'id');

const { data, isLoading } = useDocumentosPendientes(id.value);
</script>

<template>
  <LoaderSpinner v-if="isLoading" />
  <div class="q-pa-md q-gutter-md" v-else-if="data">
    <div class="fontsize-14 text-weight-light q-mb-xs">
      Documentos pendientes por entregar
    </div>
    <q-list bordered padding class="rounded-borders">
      <q-item v-for="documento in data" :key="documento.documento_id" v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="assignment" color="grey" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{
            documento.nombre_documento
          }}</q-item-label>
          <q-item-label caption>
            {{ documento.fecha_limite }}
          </q-item-label>
        </q-item-section>

        <q-item-section v-if="documento.fecha_limite_vencida" side>
          <q-icon name="event_busy" color="negative">
            <q-tooltip> Ya pasó la fecha límite de entrega </q-tooltip>
          </q-icon>
        </q-item-section>
        <q-item-section v-else side>
          <q-icon name="event_available" color="green">
            <q-tooltip> Aún pendiente la fecha de entrega </q-tooltip>
          </q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" scoped></style>
