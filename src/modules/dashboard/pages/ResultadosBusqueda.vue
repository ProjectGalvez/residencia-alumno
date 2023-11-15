<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useBuscar from '../composables/useBuscar';

const route = useRoute();
const q = ref(route.query.q || '');
onBeforeRouteUpdate((to, from, next) => {
  if (to.query.q !== q.value) {
    q.value = to.query.q || '';
  }
  next();
});
const links: Breadcrumb[] = [{ label: 'Búsqueda', icon: 'search' }];
const { isLoading, error, data, buscar } = useBuscar(q.value + '');
watch(q, (newQ, oldQ) => {
  if (newQ !== oldQ) {
    buscar(newQ + '');
  }
});
</script>

<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Resultados de búsqueda" />
    <div class="fontsize-12">Termino buscado: {{ q }}</div>

    <LoaderSpinner v-if="isLoading" />
    <div v-else-if="data && data?.length > 0">
      <small>Se encontraron {{ data.length }} resultados</small>
      <q-card
        v-for="estudiante in data"
        :key="estudiante.id_estudiante"
        class="q-mt-sm"
      >
        <q-card-section>
          <div class="flex items-center q-gutter-sm">
            <div>
              <q-avatar
                v-if="estudiante.url_foto"
                size="70px"
                color="primary"
                text-color="white"
              >
                <img :src="estudiante.url_foto" />
              </q-avatar>
              <q-avatar v-else size="70px" color="primary" text-color="white">{{
                estudiante.iniciales_nombre_apellido
              }}</q-avatar>
            </div>
            <div>
              <RouterLink
                :to="{
                  name: 'ver-estudiante',
                  params: { id: estudiante.id_estudiante },
                }"
              >
                <div class="fontsize-14">
                  {{ estudiante.nombre_completo_estudiante }} [{{
                    estudiante.numero_control_estudiante
                  }}]
                </div>
              </RouterLink>
              <div v-if="estudiante.perido_activo === 1">
                Esta realizando su residencia en
                <RouterLink
                  :to="{
                    name: 'ver-empresa',
                    params: { id: estudiante.id_empresa },
                  }"
                >
                  {{ estudiante.nombre_empresa }}
                </RouterLink>
                en el perido activo
                <RouterLink
                  :to="{
                    name: 'ver-periodo',
                    params: { id: estudiante.id_periodo },
                  }"
                >
                  {{ estudiante.nombre_periodo }}
                </RouterLink>
                <div>
                  <RouterLink
                    :to="{
                      name: 'asignar-documento',
                      params: { id: estudiante.id_estudiante },
                    }"
                  >
                    <q-btn
                      size="sm"
                      color="secondary"
                      label="Agregar documentos"
                    />
                  </RouterLink>
                  <RouterLink
                    :to="{
                      name: 'ver-residente',
                      params: { id: estudiante.id_estudiante },
                    }"
                  >
                    <q-btn size="sm" color="info" label="Ver residente" />
                  </RouterLink>
                </div>
              </div>
              <div v-else-if="estudiante.perido_activo === 0">
                Realizó su residencia profesional en
                <RouterLink
                  :to="{
                    name: 'ver-empresa',
                    params: { id: estudiante.id_empresa },
                  }"
                >
                  {{ estudiante.nombre_empresa }}
                </RouterLink>
                en el perido
                <RouterLink
                  :to="{
                    name: 'ver-periodo',
                    params: { id: estudiante.id_periodo },
                  }"
                >
                  {{ estudiante.nombre_periodo }}
                </RouterLink>
                <RouterLink
                  :to="{
                    name: 'ver-residente',
                    params: { id: estudiante.id_estudiante },
                  }"
                >
                  <q-btn size="sm" color="info" label="Ver residente" />
                </RouterLink>
              </div>
              <div v-else-if="estudiante.perido_activo === null">
                <RouterLink
                  :to="{
                    name: 'asignar-residencia',
                    params: { id: estudiante.id_estudiante },
                  }"
                >
                  <q-btn
                    size="sm"
                    color="deep-orange"
                    label="Asignar residencia"
                  />
                </RouterLink>
              </div>
              <RouterLink
                :to="{
                  name: 'ver-carrera',
                  params: { id: estudiante.id_carrera },
                }"
              >
                <q-chip
                  :style="{ backgroundColor: estudiante.color_carrera }"
                  text-color="white"
                >
                  {{ estudiante.nombre_carrera }}
                </q-chip>
              </RouterLink>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>No se encontraron resultados</div>
  </q-page>
</template>

<style scoped></style>
