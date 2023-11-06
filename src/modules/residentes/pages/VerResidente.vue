<script setup lang="ts">
import EntregasEstudiante from '../../estudiantes/components/EntregasEstudiante.vue';
import DatosResidencia from '../components/DatosResidencia.vue';
import { useRoute } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';

const route = useRoute();
const { id = '' } = route.params;

const links: Breadcrumb[] = [
  { label: 'Residentes', icon: 'history_edu', to: 'listar-residente' },
  { label: 'Ver residente', icon: 'visibility' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Ver Residente" />
    <div class="row">
      <div class="col-12">
        <DatosResidencia :id="id + ''" />
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col-xs-12 col-md-6">
        <q-card>
          <q-card-section>
            <EntregasEstudiante :id="id + ''" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
