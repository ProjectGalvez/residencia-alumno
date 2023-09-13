<script setup lang="ts">
import { useRouter } from 'vue-router';

import TablaCarreras from '../components/TablaCarrera.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from '../../../shared/components/BreadcrumbNav.vue';

const links: Breadcrumb[] = [{ label: 'Carreras', icon: 'local_library' }];
const router = useRouter();
const crearCarrera = () => {
  router.push({ name: 'crear-carrera' });
};
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de carreras" />

    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Carreras</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearCarrera"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaCarreras />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
