<script setup lang="ts">
import TablaPeriodo from '../components/TablaPeriodo.vue';
import { useRouter } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { getRol } from 'src/shared/helpers/getUser';
import TablaPeriodoEliminado from '../components/TablaPeriodoEliminado.vue';

const router = useRouter();
const crearPeriodo = () => {
  router.push({ name: 'crear-periodo' });
};

const rol: string = getRol();
const links: Breadcrumb[] = [{ label: 'Periodos', icon: 'date_range' }];
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de periodos" />
    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Periodos</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearPeriodo"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaPeriodo />
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md" v-if="rol === 'admin'">
      <q-card-section>
        <div class="fontsize-15 text-weight-light">Peridos eliminadas</div>
      </q-card-section>
      <q-card-section>
        <TablaPeriodoEliminado />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
