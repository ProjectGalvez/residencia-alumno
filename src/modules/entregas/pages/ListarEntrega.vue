<script setup lang="ts">
import { useRouter } from 'vue-router';

import TablaEntrega from '../components/TablaEntrega.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from '../../../shared/components/BreadcrumbNav.vue';
import { getRol } from 'src/shared/helpers/getUser';

const links: Breadcrumb[] = [
  { label: 'Entregas', icon: 'assignment_turned_in' },
];
const router = useRouter();
const crearEntrega = () => {
  router.push({ name: 'crear-entrega' });
};
const rol: string = getRol();
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de entregas" />
    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Entregas</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearEntrega"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaEntrega />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
