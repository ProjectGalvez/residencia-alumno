<script setup lang="ts">
import usePerfil from 'src/modules/auth/composables/usePerfil';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

import { useRouter } from 'vue-router';

const { user, isLoading } = usePerfil();
const router = useRouter();

const cambiarPassword = () => {
  router.push({ name: 'cambiar-password-estudiante' });
};
</script>
<template>
  <q-page padding>
    <LoaderSpinner v-if="isLoading" />
    <div class="row" v-else-if="user">
      <!-- Primera columna -->
      <div class="col-md-6 col-xs-12 q-pa-lg">
        <q-card class="profile-card">
          <q-card-section class="cover-section">
            <q-avatar class="avatar-overlay" size="150px">
              <img :src="user?.url_foto" alt="Foto de perfil" />
            </q-avatar>
            <q-img
              class="cover-image"
              :src="user.url_portada"
              alt="Portada del perfil"
            />
          </q-card-section>
          <q-card-section>
            <div class="username">
              {{ user.name }}
            </div>
            <div class="text-subtitle2">Correo: {{ user?.email }}</div>
          </q-card-section>
          <q-card-section>
            <q-btn
              color="deep-orange"
              glossy
              label="Cambiar contraseña"
              size="xs"
              @click="cambiarPassword"
            />
          </q-card-section>
        </q-card>
      </div>
      <!-- Segunda columna (puedes agregarla según tus necesidades) -->
    </div>
  </q-page>
</template>

<style scoped>
.change-cover-button {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 2;

  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.change-avatar-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 90%);
  z-index: 2;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.profile-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.column-left {
  max-width: 350px;
}

.profile-card {
  width: 100%;
}

.cover-section {
  position: relative;
  padding: 0;
  overflow: hidden;
}

.avatar-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.cover-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

.username {
  margin-top: 10px;
  text-align: center;
  font-size: 24px;
}
.text-left {
  text-align: left;
  margin: 0;
}
ul {
  list-style: none; /* Elimina los puntos/bullet points */
}
</style>
