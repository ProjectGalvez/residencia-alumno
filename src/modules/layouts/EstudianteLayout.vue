<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import ToggleDark from '../../shared/components/ToggleDark.vue';
import AvatarUsuario from './components/estudiante/AvatarUsuario.vue';
import useCarreraEstudiante from './components/estudiante/composables/useCarreraEstudiante';
import usePerfil from 'src/modules/auth/composables/usePerfil';

const $q = useQuasar();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const { data, isLoading } = useCarreraEstudiante();
const { user: usuario, isLoading: isLoadingPerfil } = usePerfil();
</script>

<template>
  <q-layout view="hHh LpR lFf">
    <q-header
      v-if="!isLoading"
      elevated
      class="text-white"
      :style="{ backgroundColor: data.color || '#FFF' }"
    >
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="/src/assets/logo-180x180.png" width="45" />
          </q-avatar>
          DDEP
        </q-toolbar-title>

        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <ToggleDark />
          <AvatarUsuario :avatar="usuario?.url_foto" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="280"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple :to="{ name: 'estudiante-inicio' }">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Inicio </q-item-section>
          </q-item>

          <q-item
            active
            clickable
            v-ripple
            :to="{ name: 'documentos-entregados' }"
          >
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Documentos entregados </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'estudiante-formatos' }">
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Formatos </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Acerca de </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        :src="usuario?.url_portada"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="usuario?.url_foto" />
          </q-avatar>
          <div class="text-weight-bold">{{ usuario?.name }}</div>
          <div>{{ usuario?.email }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
