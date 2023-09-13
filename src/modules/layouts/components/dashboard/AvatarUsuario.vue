<script setup lang="ts">
import { toRef } from 'vue';

interface Props {
  avatar: string;
}

const props = defineProps<Props>();
const avatar = toRef(props, 'avatar');

import MenuUser from './MenuUser.vue';
</script>

<template>
  <q-btn round flat>
    <q-avatar size="30px">
      <img :src="avatar" />
    </q-avatar>
    <MenuUser />
  </q-btn>
</template>

<style scoped></style>
