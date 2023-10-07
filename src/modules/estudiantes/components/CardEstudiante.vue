<script setup lang="ts">
import { toRef } from 'vue';
import { Estudiante } from 'src/modules/model/Model';

const props = defineProps<{ estudiante: Estudiante }>();
const estudiante = toRef(props, 'estudiante');
</script>
<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-6 q-pr-xs">
        <q-card>
          <q-card-section>
            <div
              class="fontsize-14 text-center text-weight-light flex items-center"
            >
              <q-icon name="school" class="q-mr-xs" />
              {{ estudiante.nombre }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-6 q-pl-xs">
        <q-card>
          <q-card-section>
            <div
              class="fontsize-14 text-center text-weight-light flex items-center"
            >
              <q-icon name="school" class="q-mr-xs" />
              Datos de usuario
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
