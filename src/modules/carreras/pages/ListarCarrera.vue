<script setup lang="ts">
import TablaCarreraEliminado from '../components/TablaCarreraEliminado.vue';
import { useRouter } from 'vue-router';

import TablaCarreras from '../components/TablaCarrera.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from '../../../shared/components/BreadcrumbNav.vue';
import { getRol } from 'src/shared/helpers/getUser';

const links: Breadcrumb[] = [{ label: 'Carreras', icon: 'local_library' }];
const router = useRouter();
const crearCarrera = () => {
  router.push({ name: 'crear-carrera' });
};
const rol: string = getRol();
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

    <q-card class="q-mt-md" v-if="rol === 'admin'">
      <q-card-section>
        <div class="fontsize-15 text-weight-light">Carreras eliminadas</div>
      </q-card-section>
      <q-card-section>
        <TablaCarreraEliminado />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
