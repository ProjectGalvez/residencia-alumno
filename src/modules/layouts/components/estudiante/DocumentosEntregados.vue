<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useObtenerEntregas from './composables/useObtenerEntregas';
import { date } from 'quasar';

const { isLoading, error, data } = useObtenerEntregas();
</script>

<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12">
        <LoaderSpinner v-if="isLoading" />
        <q-card v-else-if="data && data?.length > 0">
          <q-card-section>
            <div
              class="fontsize-14 text-center text-weight-light flex items-center"
            >
              <q-icon name="description" class="q-mr-xs" />
              Documentos entregados
            </div>
          </q-card-section>
          <q-card-section>
            <q-timeline color="secondary">
              <q-timeline-entry
                v-for="entrega in data"
                :key="entrega.id"
                :title="entrega.nombre_documento"
                :subtitle="
                  date.formatDate(entrega.fecha_entrega, 'DD de MMMM de YYYY')
                "
                :icon="entrega.icono"
              >
                <div>Entrega de {{ entrega.nombre_documento }}</div>
                <div v-if="entrega.url_formato">
                  El formato entregado puedes descargarlo
                  <a :href="entrega.url_formato">
                    <q-icon :name="entrega.icono" /> aquí</a
                  >
                </div>
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
        <div v-else-if="data && data?.length == 0">
          <div class="fontsize-14 text-center text-weight-light q-pa-md">
            <q-icon name="description" class="q-mr-xs" />
            No tienes documentos agregados 😢 Si crees que es un error,
            reportalo con los departamentos correspondientes.
          </div>
        </div>
        <div v-else-if="data.message">{{ data.message }}</div>
        <div v-else>{{ error }}</div>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
