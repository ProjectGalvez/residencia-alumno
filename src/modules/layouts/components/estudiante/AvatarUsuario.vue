<script setup lang="ts">
import usePerfil from 'src/modules/auth/composables/usePerfil';
import MenuUser from './MenuUser.vue';

const { user, isLoading } = usePerfil();
</script>

<template>
  <q-btn round flat :loading="isLoading">
    <q-avatar size="30px">
      <img :src="user?.url_foto" />
    </q-avatar>
    <MenuUser />
  </q-btn>
</template>

<style scoped></style>
