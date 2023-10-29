<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import usePerfil from 'src/modules/auth/composables/usePerfil';

const { user: usuario, isLoading } = usePerfil();
</script>
<template>
  <LoaderSpinner v-if="isLoading" />

  <q-img
    v-else-if="usuario"
    class="absolute-top"
    :src="usuario?.url_portada"
    style="height: 150px"
  >
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="56px" class="q-mb-sm">
        <img :src="usuario?.url_foto" />
      </q-avatar>
      <RouterLink :to="{ name: 'perfil-admin' }">
        <div class="text-weight-bold shadow">{{ usuario.name }}</div>

        <div class="shadow">{{ usuario.email }}</div>
      </RouterLink>
    </div>
  </q-img>
</template>

<style scoped>
.shadow {
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.9);
  cursor: pointer;
}
</style>
