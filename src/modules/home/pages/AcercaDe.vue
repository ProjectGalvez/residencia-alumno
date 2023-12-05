<template>
  <q-layout class="home-page">
    <q-page-container>
      <q-page padding>
        <div class="alto flex justify-between items-center">
          <div class="logo">
            <div class="fontsize-18 text-center text-weight-light titulo">
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
              <li>
                <router-link :to="{ name: 'home' }">Inicio</router-link>
              </li>
              <!-- Agrega más elementos de menú según sea necesario -->
            </ul>
          </div>
        </div>
        <q-card>
          <q-card-section>
            <div class="text-h6">Acerca de</div>
          </q-card-section>
          <q-card-section>
            <div class="text-body1">
              Esta aplicación web de Residencias Profesionales es el resultado
              de un proyecto de tesis desarrollado por Lizbeth Hernandez
              Santiago y Verónica Gálvez Gregorio, quien se dedicó a crear una
              solución versátil que simplifica y potencia la gestión de
              proyectos de residencias profesionales, tanto para estudiantes
              como para administradores.
            </div>
            <div class="text-body1">
              Para los estudiantes, representa una puerta de acceso al control
              de su progreso y proyectos, con la capacidad de rastrear el estado
              de sus residencias, acceder a documentos entregados y descargar
              formatos esenciales para la documentación. Esta herramienta
              proporciona una experiencia de usuario intuitiva y segura.
            </div>
            <div class="text-body1">
              Los administradores, por su parte, disfrutan de la posibilidad de
              validar y administrar documentos de manera eficiente, garantizando
              un proceso fluido y simplificado para todos los involucrados. La
              plataforma asegura la confidencialidad y seguridad de la
              información.
            </div>
            <div class="text-body1">
              Esta aplicación está dedicada a la misión de unir esfuerzos,
              brindando un apoyo sólido a estudiantes y administradores para
              alcanzar el éxito en las residencias profesionales. Se destaca por
              su accesibilidad y eficacia en la gestión de proyectos educativos
              y profesionales. ¡Bienvenidos a una herramienta que impulsa el
              éxito de todos sus usuarios, desarrollada por Hernández como parte
              de su proyecto de tesis!
            </div>
            <div class="flex justify-end">
              <q-chip>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                Hernández
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { useQuasar } from 'quasar';

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

<style lang="scss" scoped>
.alto {
  height: 8vh;
}
.home-page {
  background-image: url('/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.titulo {
  color: white;
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
