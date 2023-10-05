<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { getRol } from 'src/shared/helpers/getUser';
import TablaUsers from '../components/TablaUsers.vue';

const router = useRouter();
const crearUser = () => {
  router.push({ name: 'crear-usuario' });
};
const rol: string = getRol();
const links: Breadcrumb[] = [{ label: 'Usuarios', icon: 'people' }];
</script>
<template>
  <q-page padding>
    <BreadcrumbNav :pages="links" titlePage="Lista de usuarios" />
    <q-card>
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="fontsize-15 text-weight-light">Usuarios</div>
          <q-btn
            label="Nuevo"
            icon="add_circle_outline"
            color="secondary"
            size="md"
            padding="xs"
            @click="crearUser"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <TablaUsers />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
