<script setup lang="ts">
import { toRef } from 'vue';
import { Periodo } from 'src/modules/model/Model';

const props = defineProps<{ periodo: Periodo }>();
const periodo = toRef(props, 'periodo');
</script>
<template>
  <q-card>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="date_range" class="q-mr-xs" />
            {{ periodo.nombre }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex justify-star items-center">
            <table>
              <tr>
                <td>Inicio del periodo:</td>
                <td>{{ periodo.fecha_inicio }}</td>
              </tr>
              <tr>
                <td>Término del periodo:</td>
                <td>{{ periodo.fecha_termino }}</td>
              </tr>
              <tr>
                <td>Periodo activo:</td>
                <td>{{ periodo.activo === 1 ? 'Activo' : 'Inactivo' }}</td>
              </tr>
            </table>
          </div>
        </q-card-section>
      </div>
      <!-- Otra columna -->
    </div>
  </q-card>
</template>

<style scoped>
table tr td:nth-child(2) {
  font-weight: bold;
}
.color-link {
  color: #0461dd;
}
</style>
