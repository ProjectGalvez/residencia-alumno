<script setup lang="ts">
import { ref } from 'vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Documento } from 'src/modules/model/Model';
import useCrearDocumento from '../composables/useCrearDocumento';
import FormDocumento from '../components/FormDocumento.vue';
const documento = ref<Documento>({
  id: 0,
  nombre_documento: '',
  fecha_limite: null,
  url_formato: '',
  abrev_nombre: '',
});

const { createResource, isLoadingCreate, errorServer, isSuccess, status } =
  useCrearDocumento();
const guardar = (documento: FormData) => {
  createResource(documento);
};

const links: Breadcrumb[] = [
  {
    label: 'Documentos',
    icon: 'description',
    to: 'listar-documento',
  },
  { label: 'Crear documento', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Registrar documento" />
    <form-documento
      :documento="documento"
      :loading="isLoadingCreate"
      :errorServer="errorServer"
      @guardar="guardar"
    />
  </q-page>
</template>

<style scoped></style>
