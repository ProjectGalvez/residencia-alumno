<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useVerUser from '../composables/useVerUser';
import useActualizarUser from '../composables/useActualizarUser';
import FormEditarUser from '../components/FormEditarUser.vue';

const route = useRoute();
const router = useRouter();
const { id = '' } = route.params;

const { resource: user, isLoading, error } = useVerUser(id + '');
const { actalizarRecurso, isLoadingActualizar, isSuccess, errorServer } =
  useActualizarUser();

const guardar = (user: FormData) => {
  actalizarRecurso(user);
};
const links: Breadcrumb[] = [
  {
    label: 'Usuarios',
    icon: 'people',
    to: 'listar-usuario',
  },
  { label: 'Editar usuario', icon: 'edit' },
];
</script>
<template>
  <q-page padding>
    <breadcrumb-nav :pages="links" titlePage="Editar usuario" />
    <LoaderSpinner v-if="isLoading" />
    <FormEditarUser
      v-else-if="user"
      :user="user"
      :loading="isLoadingActualizar"
      :errorServer="errorServer"
      @guardar="guardar"
    />
    <div v-else>{{ error }}</div>
  </q-page>
</template>

<style scoped></style>
