<script setup lang="ts">
import { Asesor } from 'src/modules/model/Model';
import { toRef } from 'vue';
const props = defineProps<{ asesor: Asesor }>();
const asesor = toRef(props, 'asesor');
</script>

<template>
  <q-card>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="supervisor_account" class="q-mr-xs" />
            {{ asesor.nombre }} {{ asesor.apellidos }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex justify-star items-center">
            <table>
              <tr>
                <td>Teléfono:</td>
                <td>{{ asesor.telefono }}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{{ asesor.email }}</td>
              </tr>
              <tr>
                <td>Título:</td>
                <td>{{ asesor.titulo }}</td>
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
.color-link {
  color: #0461dd;
}
</style>
