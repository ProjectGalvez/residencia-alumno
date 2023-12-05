<script setup lang="ts">
import TablaAsesores from '../components/TablaAsesores.vue';
import { useRouter } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';

const router = useRouter();

const crearAsesor = () => {
  router.push({ name: 'crear-asesor' });
};
const links: Breadcrumb[] = [{ label: 'Asesores', icon: 'supervisor_account' }];
</script>

<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de asesores" />
    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Asesores internos</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearAsesor"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaAsesores />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
