<script setup lang="ts">
import { Breadcrumb } from './Breadcrum';

interface Props {
  titlePage: string;
  pages?: Breadcrumb[];
  activeColor?: string;
  colorText?: string;
  separator?: string;
  colorSeparatpr?: string;
}

const props = withDefaults(defineProps<Props>(), {
  activeColor: 'secondary',
  colorText: 'info',
  separator: 'arrow_forward',
  colorSeparatr: 'secondary',
  titlePage: '',
});
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="fontsize-16">
      {{ props.titlePage }}
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs :active-color="props.activeColor" :class="props.colorText">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" :color="colorSeparatpr" />
        </template>
        <q-breadcrumbs-el icon="analytics" :to="{ name: 'dashboard-home' }" />
        <q-breadcrumbs-el
          v-for="page of props.pages"
          :key="page.label"
          :label="page.label"
          :icon="page.icon"
          :to="{ name: page.to }"
        />
      </q-breadcrumbs>
    </div>
  </div>
</template>

<style scoped></style>
