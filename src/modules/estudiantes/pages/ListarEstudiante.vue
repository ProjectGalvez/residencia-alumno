<script setup lang="ts">
import TablaEstudianteEliminado from '../components/TablaEstudianteEliminado.vue';
import TablaEstudiantePaginado from '../components/TablaEstudiantePaginado.vue';
import { useRouter } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import usePerfil from 'src/modules/auth/composables/usePerfil';
import { ref } from 'vue';

const router = useRouter();
const crearEstudiante = () => {
  router.push({ name: 'crear-estudiante' });
};

const { user, isLoading } = usePerfil();

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
        <TablaEstudiantePaginado />
      </q-card-section>
    </q-card>
    <div v-if="isLoading">Cargando ---</div>
    <q-card v-else-if="user.roles[0].name === 'admin'" class="q-mt-md">
      <q-card-section> Estudiantes eliminados </q-card-section>
      <q-card-section>
        <TablaEstudianteEliminado />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
