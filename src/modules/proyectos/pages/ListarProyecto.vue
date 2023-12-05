<script setup lang="ts">
import TablaProyecto from '../components/TablaProyecto.vue';
import { useRouter } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';

const router = useRouter();
const crearProyecto = () => {
  router.push({ name: 'crear-proyecto' });
};
const links: Breadcrumb[] = [{ label: 'Proyectos', icon: 'engineering' }];
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de proyectos" />

    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Proyectos</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearProyecto"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaProyecto />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
