<script setup lang="ts">
import FormAsesor from '../components/FormAsesor.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { ref } from 'vue';
import { Asesor } from 'src/modules/model/Model';
import useCrearAsesor from '../composables/useCrearAsesor';

const asesor = ref<Asesor>({
  id: 0,
  nombre: '',
  apellidos: '',
  titulo: '',
  telefono: '',
  email: '',
});
const { createResource, isLoadingCreate, errorServer } = useCrearAsesor();
const guardar = (asesor: Asesor) => {
  createResource(asesor);
};

const links: Breadcrumb[] = [
  {
    label: 'Asesores',
    icon: 'supervisor_account',
    to: 'listar-asesor',
  },
  { label: 'Registrar asesor', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Registrar asesor" />
    <FormAsesor
      :asesor="asesor"
      :loading="isLoadingCreate"
      :errorServer="errorServer"
      @guardar="guardar"
    />
  </q-page>
</template>

<style scoped></style>
