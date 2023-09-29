<script setup lang="ts">
import TablaDocumentos from '../components/TablaDocumentos.vue';
import { useRouter } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { getRol } from 'src/shared/helpers/getUser';
import TablaDocumentoEliminado from '../components/TablaDocumentoEliminado.vue';

const router = useRouter();

const crearDocumento = () => {
  router.push({ name: 'crear-documento' });
};
const rol: string = getRol();
const links: Breadcrumb[] = [{ label: 'Documentos', icon: 'description' }];
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de documentos" />
    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Documentos</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearDocumento"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaDocumentos />
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md" v-if="rol === 'admin'">
      <q-card-section>
        <div class="fontsize-15 text-weight-light">Documentos eliminadas</div>
      </q-card-section>
      <q-card-section>
        <TablaDocumentoEliminado />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
