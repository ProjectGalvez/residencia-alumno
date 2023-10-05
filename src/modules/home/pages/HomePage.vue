<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useQuasar } from 'quasar';
import SliderImagenes from '../components/SliderImagenes.vue';

const $q = useQuasar();
const usuarioString = $q.localStorage.getItem('user');
const usuario = JSON.parse(usuarioString + '');
const router = useRouter();

const irAdministracion = () => {
  const role = usuario.role;
  if (role.includes('admin')) {
    router.push({ name: 'dashboard-home' });
  } else if (role.includes('capturista')) {
    router.push({ name: 'dashboard-home' });
  } else if (role.includes('estudiante')) {
    router.push({ name: 'dashboard-estudiante' });
  } else {
    // Redirección predeterminada si el rol no coincide con los esperados
    router.push({ name: 'not-found' });
  }
};
</script>
<template>
  <q-layout class="fondo">
    <q-page-container>
      <q-page padding>
        <div class="flex justify-between items-center">
          <div class="text-h3 text-weight-medium">DDEP - ITT</div>
          <div class="q-gutter-sm">
            <q-btn
              v-if="usuario"
              color="primary"
              label="Administrar"
              @click="irAdministracion"
            />
            <q-btn
              v-else
              color="primary"
              label="Iniciar sesión"
              :to="{ name: 'login' }"
            />
          </div>
        </div>

        <SliderImagenes />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.fondo {
  background-color: #1b396a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='0' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239114ae'/%3E%3Cstop offset='1' stop-color='%239114ae' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='1200' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23146fae'/%3E%3Cstop offset='1' stop-color='%23146fae' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='600' cy='0' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239900ff'/%3E%3Cstop offset='1' stop-color='%239900ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='600' cy='800' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231B396A'/%3E%3Cstop offset='1' stop-color='%231B396A' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='e' cx='0' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23FF0000'/%3E%3Cstop offset='1' stop-color='%23FF0000' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='f' cx='1200' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230CF'/%3E%3Cstop offset='1' stop-color='%230CF' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' width='1200' height='800'/%3E%3Crect fill='url(%23c)' width='1200' height='800'/%3E%3Crect fill='url(%23d)' width='1200' height='800'/%3E%3Crect fill='url(%23e)' width='1200' height='800'/%3E%3Crect fill='url(%23f)' width='1200' height='800'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
</style>
