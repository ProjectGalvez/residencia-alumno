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
    router.push({ name: 'not-found' });
  }
};
</script>
<template>
  <q-layout class="home-page">
    <q-page-container>
      <q-page padding>
        <div class="">
          <div class="alto flex justify-between items-center">
            <div class="logo">
              <div
                class="fontsize-18 text-center text-weight-light flex items-center"
              >
                DDEP - ITT
              </div>
            </div>
            <div class="menu">
              <ul>
                <li v-if="usuario">
                  <a @click="irAdministracion">Entrar</a>
                </li>
                <li v-else>
                  <router-link :to="{ name: 'login' }"
                    >Inicio de Sesión</router-link
                  >
                </li>
                <li><a>Acerca de</a></li>
                <!-- Agrega más elementos de menú según sea necesario -->
              </ul>
            </div>
          </div>

          <div class="row items-center section1">
            <div class="col-xs-12 col-sm-6 q-pa-lg items-center">
              <div class="fontsize-18 text-weight-light flex">
                Bienvenido a la administración del
                <span class="depto"
                  >Departamento de División de Estudios Profesionales</span
                >
              </div>
              <p>
                Enfocados en brindar las herramientas y apoyo necesarios para que alcances el éxito en tus residencias profesionales.
              </p>
            </div>
            <div class="col-xs-12 col-sm-6 items-center">
              <div class="text-center">
                <div class="image-container">
                  <img
                    src="/logo.png"
                    style="height: 300px; max-width: 300px"
                    class="glow-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SliderImagenes />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.alto {
  height: 8vh;
}
.home-page {
  background-image: url('/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
}

.menu ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
}

.menu li {
  position: relative;
}
.depto {
  color: #007bff;
  font-weight: 700;
}
.menu a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  position: relative;
  transition: color 0.3s;
  padding: 4px;
  cursor: pointer;
}

.menu a::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: #fff; /* Línea bajo el enlace */
  bottom: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.3s; /* Efecto de transición para la línea */
}

.menu a:hover {
  color: #007bff; /* Color al pasar el mouse */
}

.menu a:hover::before {
  transform: scaleX(1);
}
.section1 {
  height: 92vh;
}
.image-container {
  display: inline-block;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); /* Color y opacidad del resplandor */
}
</style>
