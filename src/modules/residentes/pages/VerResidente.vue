<script setup lang="ts">
import DocumentosPendientes from '../components/DocumentosPendientes.vue';
import FabResidente from '../components/FabResidente.vue';
import EntregasEstudiante from '../../estudiantes/components/EntregasEstudiante.vue';
import DatosResidencia from '../components/DatosResidencia.vue';
import { useRoute } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { ref } from 'vue';

const route = useRoute();
const { id = '' } = route.params;

const links: Breadcrumb[] = [
  { label: 'Residentes', icon: 'history_edu', to: 'listar-residente' },
  { label: 'Ver residente', icon: 'visibility' },
];
const fabPos = ref([18, 18]);
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
      <div class="col-xs-12 col-md-6 q-pr-xs">
        <q-card>
          <q-card-section>
            <EntregasEstudiante :id="id + ''" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-6 q-pl-xs">
        <q-card>
          <q-card-section>
            <DocumentosPendientes :id="id + ''" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="fabPos">
      <FabResidente :id="id + ''" />
    </q-page-sticky>
  </q-page>
</template>

<style scoped></style>
