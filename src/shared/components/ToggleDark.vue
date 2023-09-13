<script setup lang="ts">
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';

const darkMode = ref(false);
const $q = useQuasar();

watch(darkMode, (darkMode) => {
  $q.dark.set(darkMode);
  $q.localStorage.set('darkMode', darkMode);
});

onMounted(() => {
  const darkModeIsActive = $q.localStorage.getItem('darkMode');
  if (darkModeIsActive) darkMode.value = true;
  else darkMode.value = false;
});
</script>
<template>
  <q-toggle
    v-model="darkMode"
    color="dark"
    checked-icon="dark_mode"
    unchecked-icon="light_mode"
    class="no-margin no-padding"
    size="lg"
  />
</template>

<style scoped></style>
