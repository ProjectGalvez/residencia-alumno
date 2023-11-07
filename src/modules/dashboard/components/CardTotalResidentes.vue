<script setup lang="ts">
import { useRouter } from 'vue-router';
import useNumeroResidentes from '../composables/useNumeroResidentes';
const { data, isLoading } = useNumeroResidentes();
const router = useRouter();
const residentesIr = () => {
  router.push({ name: 'listar-residente' });
};
</script>

<template>
  <div class="col-xs-12 col-sm-3">
    <q-card
      class="bg-primary text-white clickable"
      flat
      bordered
      @click="residentesIr"
    >
      <q-card-section>
        <div
          class="fontsize-11 text-center text-weight-light flex items-center"
        >
          Residentes
        </div>
        <div class="flex items-center justify-between">
          <q-icon name="school" color="cyan" size="4.4em" />
          <q-spinner
            v-if="isLoading"
            color="secondary"
            size="3em"
            :thickness="2"
          />

          <div v-if="data" class="text-right text-h2 q-pl-md">
            {{ data.no_residentes }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
