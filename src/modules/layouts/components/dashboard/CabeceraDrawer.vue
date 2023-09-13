<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

const usuarioString = $q.localStorage.getItem('user');
const usuario = JSON.parse(usuarioString);
</script>
<template>
  <q-img class="absolute-top" :src="usuario.url_portada" style="height: 150px">
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="56px" class="q-mb-sm">
        <img :src="usuario.url_foto" />
      </q-avatar>
      <div class="text-weight-bold">{{ usuario.name }}</div>
      <div>{{ usuario.email }}</div>
    </div>
  </q-img>
</template>

<style scoped></style>
