<script setup lang="ts">
import useNumeroResidentes from '../composables/useNumeroResidentes';
const { data, isLoading } = useNumeroResidentes();
</script>

<template>
  <div class="col-sm-12 col-md-3">
    <q-card class="bg-primary text-white" flat bordered>
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

<style scoped></style>
