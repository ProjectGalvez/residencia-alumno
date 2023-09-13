<script setup lang="ts">
import { ref } from 'vue';
import useLogin from '../composables/useLogin';

const email = ref('');
const password = ref('');
const device_name = navigator.userAgent ?? 'Unknow';

const { login, isLoading, error, hasError } = useLogin();

const onSubmit = async () => {
  await login(email.value, password.value, device_name);
};
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center fondo">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-h5 text-weight-bold">Iniciar sesión</div>
            <div class="text-h6">
              Departamento de División de Estudios Profesionales
            </div>
            <q-img src="/src/assets/logo.png" alt="logo-ITT" class="logo" />
          </q-card-section>
          <div v-if="error">
            <q-banner v-if="hasError" inline-actions class="text-white bg-red">
              {{ error.message }}
            </q-banner>
          </div>
          <q-form @submit.prevent="onSubmit">
            <q-card-section>
              <q-input
                outlined
                v-model="email"
                label="Correo electrónico"
                :rules="[
                  (val) => !!val || 'El correo electrónico es requerido',
                ]"
              ></q-input>

              <q-input
                outlined
                class="q-mt-md"
                v-model="password"
                type="password"
                label="Contraseña"
                :rules="[(val) => !!val || 'La contraseña es requerida']"
              ></q-input>
            </q-card-section>

            <q-card-section>
              <q-btn
                style="border-radius: 8px"
                color="primary"
                rounded
                size="md"
                label="Iniciar sesión"
                no-caps
                class="full-width"
                type="submit"
                :loading="isLoading"
              ></q-btn>
            </q-card-section>
            <q-card-section>
              <router-link :to="{ name: 'home' }">Ir al inicio</router-link>
            </q-card-section>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.fondo {
  background-color: #1b396a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='0' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239114ae'/%3E%3Cstop offset='1' stop-color='%239114ae' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='1200' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23146fae'/%3E%3Cstop offset='1' stop-color='%23146fae' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='600' cy='0' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239900ff'/%3E%3Cstop offset='1' stop-color='%239900ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='600' cy='800' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231B396A'/%3E%3Cstop offset='1' stop-color='%231B396A' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='e' cx='0' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23FF0000'/%3E%3Cstop offset='1' stop-color='%23FF0000' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='f' cx='1200' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230CF'/%3E%3Cstop offset='1' stop-color='%230CF' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' width='1200' height='800'/%3E%3Crect fill='url(%23c)' width='1200' height='800'/%3E%3Crect fill='url(%23d)' width='1200' height='800'/%3E%3Crect fill='url(%23e)' width='1200' height='800'/%3E%3Crect fill='url(%23f)' width='1200' height='800'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
.logo {
  width: 40%;
}
</style>
