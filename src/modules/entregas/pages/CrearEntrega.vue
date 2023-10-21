<script setup lang="ts">
import FormEntrega from '../components/FormEntrega.vue';
import { ref } from 'vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import useCrearEntrega from '../composables/useCrearEntrega';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Entrega } from 'src/modules/model/Model';

const entrega = ref<Entrega>({
  id: '',
  url_documento: null,
  fecha_entrega: null,
  estado: true,
  documento_id: 0,
  estudiante_id: '',
});
const { createResource, isLoadingCreate, errorServer } = useCrearEntrega();
const guardar = (entrega: FormData) => {
  createResource(entrega);
};

const links: Breadcrumb[] = [
  {
    label: 'Entregas',
    icon: 'assignment_turned_in',
    to: 'listar-entrega',
  },
  { label: 'Registrar entrega', icon: 'add_circle_outline' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Registrar entrega de documento" />
    <FormEntrega
      :entrega="entrega"
      :loading="isLoadingCreate"
      :errorServer="errorServer"
      @guardar="guardar"
    />
  </q-page>
</template>

<style scoped></style>
