<script setup lang="ts">
import { ref } from 'vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Periodo } from 'src/modules/model/Model';
import useCrearPeriodo from '../composables/useCrearPeriodo';
import FormPeriodo from '../components/FormPeriodo.vue';

const periodo = ref<Periodo>({
  id: 0,
  nombre: '',
  fecha_inicio: '',
  fecha_termino: '',
  activo: false,
});

const { createResource, isLoadingCreate, errorServer } = useCrearPeriodo();
const guardar = (periodo: Periodo) => {
  createResource(periodo);
};
const links: Breadcrumb[] = [
  {
    label: 'Periodos',
    icon: 'date_range',
    to: 'listar-periodo',
  },
  { label: 'Crear periodo', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Registrar periodo" />
    <form-periodo
      :periodo="periodo"
      :loading="isLoadingCreate"
      :errorServer="errorServer"
      @guardar="guardar"
    />
  </q-page>
</template>

<style scoped></style>
