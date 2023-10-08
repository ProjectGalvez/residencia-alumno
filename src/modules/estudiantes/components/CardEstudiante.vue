<script setup lang="ts">
import { toRef, ref } from 'vue';
import { Estudiante } from 'src/modules/model/Model';
import FabEstudiante from './FabEstudiante.vue';

const props = defineProps<{ estudiante: Estudiante }>();
const estudiante = toRef(props, 'estudiante');
const fabPos = ref([18, 18]);
</script>
<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section>
            <div
              class="fontsize-14 text-center text-weight-light flex items-center"
            >
              <q-icon name="school" class="q-mr-xs" />
              {{ estudiante.nombre }} {{ estudiante.apellidos }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="flex justify-star items-center">
              <table>
                <tr>
                  <td>Número de control:</td>
                  <td>{{ estudiante.numero_control }}</td>
                </tr>
                <tr>
                  <td>Carrera:</td>
                  <td>
                    <span v-if="estudiante.carrera">{{
                      estudiante.carrera.nombre
                    }}</span>
                  </td>
                </tr>
                <tr>
                  <td>Correo electrónico</td>
                  <td>{{ estudiante.email }}</td>
                </tr>
                <tr>
                  <td>Teléfono</td>
                  <td>{{ estudiante.telefono }}</td>
                </tr>
                <tr>
                  <td>Domicilio</td>
                  <td>{{ estudiante.domicilio }}</td>
                </tr>
                <tr>
                  <td>Ciudad</td>
                  <td>{{ estudiante.ciudad }}</td>
                </tr>
                <tr>
                  <td>Seguridad social</td>
                  <td>{{ estudiante.seguridad_social }}</td>
                </tr>
                <tr>
                  <td>Número de seguridad social</td>
                  <td>{{ estudiante.no_seguridad_social }}</td>
                </tr>
              </table>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section>
            <div
              class="fontsize-14 text-center text-weight-light flex items-center"
            >
              <q-icon name="account_circle" class="q-mr-xs" />
              Datos de usuario
            </div>
          </q-card-section>
          <q-card-section>
            <table>
              <tr>
                <td>Nombre</td>
                <td>
                  <span v-if="estudiante.user">{{ estudiante.user.name }}</span>
                </td>
              </tr>
              <tr>
                <td>Correo</td>
                <td>
                  <span v-if="estudiante.user">{{
                    estudiante.user.email
                  }}</span>
                </td>
              </tr>
            </table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6 q-pa-xs">
        <q-card>
          {{ estudiante.empresas }}
        </q-card>
      </div>
      <div class="col-xs-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section> Periodo </q-card-section>
          <q-card-section>
            {{ estudiante.periodos }}
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="fabPos">
      <FabEstudiante
        :id="estudiante.id"
        :is-residente="estudiante.empresas && estudiante.empresas?.length > 0"
      />
    </q-page-sticky>
  </div>
</template>

<style scoped>
table tr td:nth-child(2) {
  font-weight: bold;
}
</style>
