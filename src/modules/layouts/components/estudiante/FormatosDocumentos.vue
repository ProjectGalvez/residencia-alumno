<script setup lang="ts">
import useObtenerFormatos from './composables/useObtenerFormatos';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
const { data: formatos, isLoading, error } = useObtenerFormatos();
</script>

<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12">
        <LoaderSpinner v-if="isLoading" />
        <q-card v-else-if="formatos">
          <q-card-section>
            <div
              class="fontsize-14 text-center text-weight-light flex items-center"
            >
              <q-icon name="description" class="q-mr-xs" />
              Formatos de documentación de residencia
            </div>
          </q-card-section>
          <q-card-section>
            <q-markup-table>
              <thead>
                <tr>
                  <td>Formato</td>
                  <td>Fecha límite de entrega</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="formato in formatos" :key="formato.id">
                  <td>{{ formato.nombre_documento }}</td>
                  <td>{{ formato.fecha_limite }}</td>
                  <td>
                    <div v-if="formato.url_formato">
                      <q-icon :name="formato.icono" />
                      <a :href="formato.url_formato" download> Descargar </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
