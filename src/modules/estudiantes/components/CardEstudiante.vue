<script setup lang="ts">
import { toRef, ref } from 'vue';
import { Estudiante } from 'src/modules/model/Model';
import FabEstudiante from './FabEstudiante.vue';
import EntregasEstudiante from './EntregasEstudiante.vue';

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
                  <td>
                    {{
                      estudiante.telefono === 'null' ? '' : estudiante.telefono
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Domicilio</td>
                  <td>
                    {{
                      estudiante.domicilio === 'null'
                        ? ''
                        : estudiante.domicilio
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Ciudad</td>
                  <td>
                    {{ estudiante.ciudad === 'null' ? '' : estudiante.ciudad }}
                  </td>
                </tr>
                <tr>
                  <td>Seguridad social</td>
                  <td>
                    {{
                      estudiante.seguridad_social === 'null'
                        ? ''
                        : estudiante.seguridad_social
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Número de seguridad social</td>
                  <td>
                    {{
                      estudiante.no_seguridad_social === 'null'
                        ? ''
                        : estudiante.no_seguridad_social
                    }}
                  </td>
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
            <q-img
              v-if="estudiante.user?.url_foto"
              :src="estudiante.user?.url_foto"
              width="150px"
            >
              <template v-slot:error>
                <div
                  class="absolute-full flex flex-center bg-negative text-white"
                >
                  No se logró cargar la imagen
                </div>
              </template>
            </q-img>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div
      class="row"
      v-if="estudiante.empresas && estudiante.empresas?.length > 0"
    >
      <div class="col-xs-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section>
            <div
              class="fontsize-13 text-center text-weight-light flex items-center"
            >
              <q-icon name="domain" class="q-mr-xs" />
              Empresa en la que realiza su residencia
            </div>
          </q-card-section>
          <q-card-section
            v-for="empresa in estudiante.empresas"
            :key="empresa.id"
          >
            <table>
              <tr>
                <td>Nombre:</td>
                <td>{{ empresa.nombre }}</td>
              </tr>
              <tr>
                <td>Giro:</td>
                <td>{{ empresa.giro }}</td>
              </tr>
              <tr>
                <td>RFC:</td>
                <td>{{ empresa.rfc }}</td>
              </tr>
              <tr>
                <td>Domicilio:</td>
                <td>{{ empresa.domicilio }}</td>
              </tr>
              <tr>
                <td>Colinia:</td>
                <td>{{ empresa.colonia }}</td>
              </tr>
              <tr>
                <td>Código postal:</td>
                <td>{{ empresa.cp }}</td>
              </tr>
              <tr>
                <td>Ciudad:</td>
                <td>{{ empresa.ciudad }}</td>
              </tr>
              <tr>
                <td>Teléfono:</td>
                <td>{{ empresa.telefono }}</td>
              </tr>
              <tr>
                <td>Misión:</td>
                <td>{{ empresa.mision }}</td>
              </tr>
              <tr>
                <td>Titular:</td>
                <td>{{ empresa.titular }}</td>
              </tr>
              <tr>
                <td>Puesto del titular:</td>
                <td>{{ empresa.titular_puesto }}</td>
              </tr>
              <tr>
                <td>Asesor externo:</td>
                <td>{{ empresa.asesor_externo }}</td>
              </tr>
              <tr>
                <td>Domicilio:</td>
                <td>{{ empresa.asesor_externo_puesto }}</td>
              </tr>
              <tr>
                <td>Nombre del que firmará:</td>
                <td>{{ empresa.nombre_firmara }}</td>
              </tr>
              <tr>
                <td>Domicilio:</td>
                <td>{{ empresa.nombre_firmara_puesto }}</td>
              </tr>
            </table>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section>
            <div
              class="fontsize-13 text-center text-weight-light flex items-center"
            >
              <q-icon name="domain" class="q-mr-xs" />
              Periodo de residencia
            </div>
          </q-card-section>
          <q-card-section
            v-for="periodo in estudiante.periodos"
            :key="periodo.id"
          >
            <table>
              <tr>
                <td>Periodo:</td>
                <td>{{ periodo.nombre }}</td>
              </tr>
              <tr>
                <td>Inicio del periodo:</td>
                <td>{{ periodo.fecha_inicio }}</td>
              </tr>
              <tr>
                <td>Término del periodo:</td>
                <td>{{ periodo.fecha_termino }}</td>
              </tr>
            </table>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section>
            <EntregasEstudiante :id="estudiante.id" />
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
