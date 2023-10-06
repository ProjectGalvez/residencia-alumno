<script setup lang="ts">
import { ref } from 'vue';
import { User } from 'src/modules/model/Model';
import { Breadcrumb } from 'src/shared/components/Breadcrum';
import BreadcrumbNav from 'src/shared/components/BreadcrumbNav.vue';
import useCrearUser from '../composables/useCrearUser';
import FormUser from '../components/FormUser.vue';

const user = ref<User>({
  id: '',
  name: '',
  password: '',
  email: '',
  url_foto: '',
  rol: '',
});

const { createResource, isLoadingCreate, errorServer } = useCrearUser();
const guardar = (user: FormData) => {
  createResource(user);
};

const links: Breadcrumb[] = [
  {
    label: 'Usuarios',
    icon: 'people',
    to: 'listar-usuario',
  },
  { label: 'Crear usuario', icon: 'add_circle_outline' },
];
</script>
<template>
  <div>
    <breadcrumb-nav :pages="links" titlePage="Registrar usuario" />
    <FormUser
      :user="user"
      :loading="isLoadingCreate"
      :errorServer="errorServer"
      @guardar="guardar"
    />
  </div>
</template>

<style scoped></style>
