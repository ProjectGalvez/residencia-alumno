<script setup lang="ts">
import { ref } from 'vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Estudiante } from 'src/modules/model/Model';
import useCrearEstudiante from '../composables/useCrearEstudiante';
import FormEstudiante from '../components/FormEstudiante.vue';

const estudiante = ref<Estudiante>({
  id: '',
  user_id: '',
  carrera_id: null,
  nombre: '',
  apellidos: '',
  numero_control: '',
  domicilio: '',
  email: '',
  seguridad_social: '',
  no_seguridad_social: '',
  ciudad: '',
  telefono: '',
  password: '',
});

const { createResource, isLoadingCreate, errorServer } = useCrearEstudiante();
const guardar = (estudiante: Estudiante) => {
  createResource(estudiante);
};

const links: Breadcrumb[] = [
  {
    label: 'Estudiantes',
    icon: 'school',
    to: 'listar-estudiante',
  },
  { label: 'Crear Estudiante', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Registrar empresa" />
    <form-estudiante
      :estudiante="estudiante"
      :loading="isLoadingCreate"
      :errorServer="errorServer"
      @guardar="guardar"
    />
  </q-page>
</template>

<style scoped></style>
