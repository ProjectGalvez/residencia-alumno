<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { getRol } from 'src/shared/helpers/getUser';
import TablaEstudiante from '../components/TablaEstudiante.vue';

const router = useRouter();
const crearEstudiante = () => {
  router.push({ name: 'crear-estudiante' });
};

const rol: string = getRol();
const links: Breadcrumb[] = [{ label: 'Estudiantes', icon: 'school' }];
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de estudiantes" />
    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Estudiantes</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearEstudiante"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaEstudiante />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
