<script setup lang="ts">
import useLogout from '../../../auth/composables/useLogout';
const { logout } = useLogout();

import { useQuasar } from 'quasar';

const $q = useQuasar();

const usuarioString = $q.localStorage.getItem('user');
const usuario = JSON.parse(usuarioString + '');
</script>
<template>
  <q-menu>
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6 q-mb-md">Configuración</div>
      </div>

      <q-separator vertical inset class="q-mx-lg" />

      <div class="column items-center">
        <q-avatar size="72px">
          <img :src="usuario.url_foto" />
        </q-avatar>

        <div class="text-subtitle1 q-mt-md q-mb-xs">{{ usuario.name }}</div>

        <q-btn
          color="primary"
          label="Cerrar sesión"
          push
          size="sm"
          v-close-popup
          @click="logout"
        />
      </div>
    </div>
  </q-menu>
</template>

<style scoped></style>
