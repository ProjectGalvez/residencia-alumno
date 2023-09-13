<script setup lang="ts">
import { toRef } from 'vue';
import { date } from 'quasar';
import { Carrera } from 'src/modules/model/Model';

const props = defineProps<{ carrera: Carrera }>();
const carrera = toRef(props, 'carrera');
</script>

<template>
  <q-card>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="local_library" class="q-mr-xs" />
            {{ carrera.nombre }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex justify-star items-center">
            <q-img v-if="carrera.escudo" :src="carrera.escudo" width="150px" />
            <table>
              <tr>
                <td>Clave de la carrera:</td>
                <td>{{ carrera.clave }}</td>
              </tr>
              <tr>
                <td>Fecha de registro en la BD:</td>
                <td>{{ date.formatDate(carrera.created_at, 'd/MM/YYYY') }}</td>
              </tr>
              <tr>
                <td>Última actualización en la BD:</td>
                <td>{{ date.formatDate(carrera.updated_at, 'd/MM/YYYY') }}</td>
              </tr>
            </table>
          </div>
        </q-card-section>
      </div>
      <div class="col-xs-12 col-md-6">
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="account_balance" class="q-mr-xs" />
            Departamento
          </div>
        </q-card-section>
        <q-card-section v-if="carrera.departamento">
          <table>
            <tr>
              <td>Nombre del departamento:</td>
              <td>{{ carrera.departamento.nombre }}</td>
            </tr>
            <tr>
              <td>Nombre del titular:</td>
              <td>{{ carrera.departamento.nombre_titular }}</td>
            </tr>
            <tr>
              <td>Apellidos titular:</td>
              <td>{{ carrera.departamento.apellidos_titular }}</td>
            </tr>
            <tr>
              <td>Fecha de registro:</td>
              <td>
                Hace
                {{
                  date.formatDate(carrera.departamento.created_at, 'd/MM/YYYY')
                }}
              </td>
            </tr>
          </table>
        </q-card-section>
        <q-card-section v-else> No hay departamento asignado </q-card-section>
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
