<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { getRol } from 'src/shared/helpers/getUser';
import TablaEmpresa from '../components/TablaEmpresa.vue';
import TablaEmpresaEliminado from '../components/TablaEmpresaEliminado.vue';

const router = useRouter();
const crearEmpresa = () => {
  router.push({ name: 'crear-empresa' });
};

const rol: string = getRol();
const links: Breadcrumb[] = [{ label: 'Empresas', icon: 'domain' }];
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de empresas" />
    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Empresas</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearEmpresa"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaEmpresa />
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md" v-if="rol === 'admin'">
      <q-card-section>
        <div class="fontsize-15 text-weight-light">Empresas eliminadas</div>
      </q-card-section>
      <q-card-section>
        <TablaEmpresaEliminado />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
