<script setup lang="ts">
import { ref } from 'vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Empresa } from 'src/modules/model/Model';
import useCrearEmpresa from '../composables/useCrearEmpresa';
import FormEmpresa from '../components/FormEmpresa.vue';

const empresa = ref<Empresa>({
  id: '',
  nombre: '',
  giro: '',
  rfc: '',
  domicilio: '',
  colonia: '',
  cp: '',
  ciudad: '',
  telefono: '',
  mision: '',
  titular: '',
  titular_puesto: '',
  asesor_externo: '',
  asesor_externo_puesto: '',
  nombre_firmara: '',
  nombre_firmara_puesto: '',
});

const { createResource, isLoadingCreate, errorServer } = useCrearEmpresa();
const guardar = (empresa: Empresa) => {
  createResource(empresa);
};

const links: Breadcrumb[] = [
  {
    label: 'Empresas',
    icon: 'domain',
    to: 'listar-empresa',
  },
  { label: 'Crear empresa', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Registrar empresa" />
    <form-empresa
      :empresa="empresa"
      :loading="isLoadingCreate"
      :errorServer="errorServer"
      @guardar="guardar"
    />
  </q-page>
</template>

<style scoped></style>
