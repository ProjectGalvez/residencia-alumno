<script setup lang="ts">
import TablaResidentes from '../components/TablaResidentes.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useVerPeriodoActivo from 'src/modules/estudiantes/composables/useVerPeriodoActivo';
import { useRouter } from 'vue-router';

const router = useRouter();
const { resource, isLoading, error } = useVerPeriodoActivo();

const asignarResidencia = () => {
  router.push({ name: 'crear-residente' });
};

const links: Breadcrumb[] = [{ label: 'Residentes', icon: 'history_edu' }];
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de residentes" />
    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">
            Residentes del periodo
            <span v-if="isLoading"></span>
            <span v-else-if="resource?.nombre">{{ resource.nombre }}</span>
          </div>
          <q-btn
            label="Asignar"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="asignarResidencia"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaResidentes />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
