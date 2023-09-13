<script setup lang="ts">
import TablaDepartamentosEliminados from '../components/TablaDepartamentosEliminados.vue';
import { useRouter } from 'vue-router';

import TablaDepartamentos from '../components/TablaDepartamentos.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from '../../../shared/components/BreadcrumbNav.vue';

import { getRol } from 'src/shared/helpers/getUser';

const links: Breadcrumb[] = [
  { label: 'Departamentos', icon: 'account_balance' },
];
const router = useRouter();
const crearDepartamento = () => {
  router.push({ name: 'crear-departamento' });
};

const rol: string = getRol();
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de departamentos" />

    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Departamentos</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearDepartamento"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaDepartamentos />
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md" v-if="rol === 'admin'">
      <q-card-section>
        <div class="fontsize-15 text-weight-light">
          Departamentos eliminados
        </div>
      </q-card-section>
      <q-card-section>
        <TablaDepartamentosEliminados />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
