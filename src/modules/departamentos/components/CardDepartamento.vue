<script setup lang="ts">
import { Departamento } from 'src/modules/model/Model';
import { toRef } from 'vue';

import { timeSince } from 'src/shared/helpers/time-since';
interface Props {
  departamento: Departamento;
}
const props = defineProps<Props>();
const departamento = toRef(props, 'departamento');
</script>
<template>
  <q-card>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="account_balance" class="q-mr-xs" />
            {{ departamento.nombre }}
          </div>
        </q-card-section>
        <q-card-section>
          <table>
            <tr>
              <td>Nombre del titular:</td>
              <td>{{ departamento.nombre_titular }}</td>
            </tr>
            <tr>
              <td>Apellidos titular:</td>
              <td>{{ departamento.apellidos_titular }}</td>
            </tr>
            <tr>
              <td>Fecha de registro:</td>
              <td>Hace {{ timeSince(departamento.created_at + '') }}</td>
            </tr>
          </table>
        </q-card-section>
      </div>
      <div class="col-xs-12 col-md-6">
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="local_library" class="q-mr-xs" />
            Carreras
          </div>
        </q-card-section>
        <div v-if="departamento.carreras">
          <q-card-section
            v-for="carrera of departamento.carreras"
            :key="carrera.id"
          >
            <table>
              <q-img v-if="carrera.escudo" :src="carrera.escudo" />
              <tr>
                <td>Carrera:</td>
                <td>
                  <router-link
                    class="color-link"
                    :to="{ name: 'ver-carrera', params: { id: carrera.id } }"
                    >{{ carrera.nombre }}</router-link
                  >
                </td>
              </tr>
              <tr>
                <td>Clave:</td>
                <td>{{ carrera.clave }}</td>
              </tr>
              <tr>
                <td>Fecha de registro:</td>
                <td>Hace {{ timeSince(carrera.created_at + '') }}</td>
              </tr>
            </table>
          </q-card-section>
        </div>
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
