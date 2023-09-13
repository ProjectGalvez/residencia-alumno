<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Carrera } from 'src/modules/model/Model';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import useCrearCarrera from '../composables/useCrearCarrera';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import FormCarrera from '../components/FormCarrera.vue';

const carrera = ref<Carrera>({
  id: 0,
  nombre: '',
  clave: '',
  departamento_id: 0,
  escudo: '',
});

const router = useRouter();

const { createResource, isLoadingCreate, errorServer, isSuccess } =
  useCrearCarrera();
const guardar = (carrera: FormData) => {
  createResource(carrera);
  if (isSuccess) {
    router.push({ name: 'listar-carrera' });
  }
};

const links: Breadcrumb[] = [
  {
    label: 'Carreras',
    icon: 'local_library',
    to: 'listar-carrera',
  },
  { label: 'Crear carrera', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Registrar carrera" />
    <FormCarrera
      :carrera="carrera"
      :loading="isLoadingCreate"
      :errorServer="errorServer"
      @guardar="guardar"
    />
  </q-page>
</template>

<style scoped></style>
