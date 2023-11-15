<script setup lang="ts">
import { useRoute } from 'vue-router';
import CabeceraDrawer from './CabeceraDrawer.vue';
const route = useRoute();
const links1 = [
  { icon: 'analytics', text: 'Dashboard', to: 'dashboard-home' },
  { icon: 'assignment_turned_in', text: 'Entregas', to: 'listar-entrega' },
  { icon: 'people', text: 'Usuarios', to: 'listar-usuario' },
  { icon: 'history_edu', text: 'Residentes', to: 'listar-residente' },
  { icon: 'school', text: 'Estudiantes', to: 'listar-estudiante' },
];

const links2 = [
  { icon: 'domain', text: 'Empresas', to: 'listar-empresa' },
  { icon: 'date_range', text: 'Periodos', to: 'listar-periodo' },
  { icon: 'description', text: 'Documentos', to: 'listar-documento' },
  { icon: 'local_library', text: 'Carreras', to: 'listar-carrera' },
  { icon: 'account_balance', text: 'Departamentos', to: 'listar-departamento' },
];

const links3 = [{ icon: '', text: 'Configuración' }];

const isActive = (routeName: string) => {
  return (
    route.name === routeName ||
    (route.name?.toString() + '').startsWith(routeName)
  );
};
</script>
<template>
  <q-scroll-area
    style="
      height: calc(100% - 150px);
      margin-top: 150px;
      border-right: 1px solid #ddd;
    "
  >
    <q-list padding>
      <q-item
        class="GNL__drawer-item"
        v-ripple
        v-for="link in links1"
        :key="link.text"
        clickable
        :to="{ name: link.to }"
        :active="isActive(link.to)"
      >
        <q-item-section avatar>
          <q-icon :name="link.icon" class="icon-color" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ link.text }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset class="q-my-sm" />
      <q-item
        class="GNL__drawer-item"
        v-ripple
        v-for="link in links2"
        :key="link.text"
        clickable
        :to="{ name: link.to }"
        :active="isActive(link.to)"
      >
        <q-item-section avatar>
          <q-icon :name="link.icon" class="icon-color" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ link.text }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset class="q-my-sm" />

      <q-item
        class="GNL__drawer-item"
        v-ripple
        v-for="link in links3"
        :key="link.text"
        clickable
      >
        <q-item-section>
          <q-item-label
            >{{ link.text }}
            <q-icon v-if="link.icon" color="primary" :name="link.icon"
          /></q-item-label>
        </q-item-section>
      </q-item>

      <div class="q-mt-md">
        <div class="flex flex-center q-gutter-xs">
          <RouterLink
            :to="{ name: 'estadisticas' }"
            class="GNL__drawer-footer-link"
            aria-label="Estadísticas"
          >
            Estadísticas
          </RouterLink>

          <span> · </span>
          <a
            class="GNL__drawer-footer-link"
            href="javascript:void(0)"
            aria-label="Terminos"
            >Terminos</a
          >
        </div>
      </div>
    </q-list>
  </q-scroll-area>

  <CabeceraDrawer />
</template>

<style scoped>
.q-item--active {
  background-color: #cccccc;
}
.q-item--active .q-item__label {
  color: #1b396a;
}

.GNL__drawer-item {
  line-height: 24px;
  border-radius: 0 24px 24px 0;
  margin-right: 12px;
}

.GNL__drawer-item .q-item__label {
  letter-spacing: 0.01785714em;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.GNL__drawer-footer-link {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.75rem;
}

.GNL__drawer-footer-link:hover {
  color: #000;
}

.body--light .icon-color {
  color: #1b396a;
}

.body--dark .icon-color {
  color: #0461dd;
}
.body--dark .q-item--active .icon-color {
  color: #1b396a;
}
.body--light .q-item--active .icon-color {
  color: #0461dd;
}
</style>
