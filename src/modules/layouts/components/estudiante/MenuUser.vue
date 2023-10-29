<script setup lang="ts">
import { useRouter } from 'vue-router';
import usePerfil from 'src/modules/auth/composables/usePerfil';
import useLogout from '../../../auth/composables/useLogout';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const router = useRouter();
const { logout } = useLogout();

const irPerfil = () => {
  router.push({ name: 'perfil-estudiante' });
};

const { user: usuario, isLoading } = usePerfil();
</script>
<template>
  <q-menu>
    <LoaderSpinner v-if="isLoading" />
    <div v-else-if="usuario" class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6 q-mb-md">Configuración</div>
        <div v-if="usuario.roles">
          Rol:
          <span class="text-subtitle1">{{ usuario.roles[0].name || '' }}</span>
        </div>
        <div class="text-center q-mt-xs">
          <q-btn label="Perfil" color="accent" @click="irPerfil" />
        </div>
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
