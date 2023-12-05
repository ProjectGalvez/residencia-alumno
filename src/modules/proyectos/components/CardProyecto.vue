<script setup lang="ts">
import { toRef } from 'vue';
import { Proyecto } from 'src/modules/model/Model';

const props = defineProps<{ proyecto: Proyecto }>();
const proyecto = toRef(props, 'proyecto');
</script>

<template>
  <q-card>
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="engineering" class="q-mr-xs" />
            {{ proyecto.nombre }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex justify-star items-center">
            <table>
              <tr>
                <td>Tipo de proyecto:</td>
                <td>{{ proyecto.tipo }}</td>
              </tr>

              <tr>
                <td>Carrera:</td>
                <td>{{ proyecto.carrera?.nombre }}</td>
              </tr>
            </table>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-card>
</template>

<style scoped>
table tr td:nth-child(2) {
  font-weight: bold;
}
</style>
