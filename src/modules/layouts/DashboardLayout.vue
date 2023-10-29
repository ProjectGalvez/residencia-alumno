<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

import ToggleDark from '../../shared/components/ToggleDark.vue';
import DrawerDashboard from './components/dashboard/DrawerDashboard.vue';
import AvatarUsuario from './components/dashboard/AvatarUsuario.vue';

const leftDrawerOpen = ref(false);
const search = ref('');
const $q = useQuasar();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.xs"
          shrink
          class="row items-center no-wrap"
        >
          <img src="/src/assets/logo-180x180.png" width="45" />
          <span class="q-ml-sm">DDEP</span>
        </q-toolbar-title>

        <q-space />

        <q-input
          class="GNL__toolbar-input"
          outlined
          dense
          v-model="search"
          color="bg-grey-1 shadow-1"
          bg-color="white"
          placeholder="Buscar estudiante"
        >
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <ToggleDark />
          <AvatarUsuario />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="280">
      <DrawerDashboard />
    </q-drawer>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="sass">
.GNL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      .q-icon
        color: #5f6368

    .q-item__label

      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000

.route-enter-from
  opacity: 0
  transform: translateX(100px)

.route-enter-active
  transition: all 0.3s ease-out

.route-leave-to
  opacity: 0
  transform: translateX(-100px)

.route-leave-active
  transition: all 0.3s ease-in
</style>
