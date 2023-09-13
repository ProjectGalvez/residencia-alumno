<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Departamento } from 'src/modules/model/Model';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import FormDepartamento from '../components/FormDepartamento.vue';
import useCrearDepartamento from '../composables/useCrearDepartamento';

const router = useRouter();

const departamento = ref<Departamento>({
  id: 0,
  nombre: '',
  nombre_titular: '',
  apellidos_titular: '',
  created_at: new Date(),
  updated_at: new Date(),
});

const { crearDepartamento, isLoadingMutate, error, errorServer, isSuccess } =
  useCrearDepartamento();
const guardar = (depto: Departamento) => {
  crearDepartamento(depto);
  if (isSuccess) {
    router.push({ name: 'listar-departamento' });
  }
};

const links: Breadcrumb[] = [
  {
    label: 'Departamentos',
    icon: 'account_balance',
    to: 'listar-departamento',
  },
  { label: 'Crear departamento', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Registrar departamento" />
    <div v-if="error">{{ error }}</div>
    <form-departamento
      :departamento="departamento"
      @guardar="guardar"
      :loading="isLoadingMutate"
      :errorServer="errorServer"
    />
  </q-page>
</template>

<style scoped></style>
