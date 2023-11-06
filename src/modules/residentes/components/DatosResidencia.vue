<script setup lang="ts">
import { toRef } from 'vue';
import useVerResidente from '../composables/useVerResidente';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const props = defineProps<{ id: string }>();
const id = toRef(props, 'id');
const { isLoading, residente } = useVerResidente(id.value + '');
</script>

<template>
  <LoaderSpinner v-if="isLoading" />
  <q-card v-else-if="residente">
    <q-card-section>
      <div class="text-weight-medium">
        Nombre del proyecto:
        <span class="text-data">{{ residente.proyecto }}</span>
      </div>
      <div class="text-weight-medium">
        Periodo proyectado:
        <span class="text-data">{{ residente.nombre_periodo }}</span>
      </div>
      <q-separator color="orange" />
      <div class="fontsize-14 text-weight-light q-mb-xs">
        Datos de la/el residente
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-3 q-mb-xs">
          <q-img
            v-if="residente.url_foto"
            :src="residente.url_foto"
            width="200px"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-9">
          <div
            class="row wrap justify-start items-start content-start q-gutter-md"
          >
            <div class="col-auto">
              <div class="text-weight-medium">Nombre:</div>
              <div class="text-subtitle1 text-weight-light">
                {{ residente.nombre_estudiante }} {{ residente.apellidos }}
              </div>
            </div>

            <div class="col-auto">
              <div class="text-weight-medium">Número de control:</div>
              <div class="text-subtitle1 text-weight-light">
                {{ residente.numero_control }}
              </div>
            </div>

            <div class="col-auto">
              <div class="text-weight-medium">Carrera:</div>
              <div class="text-subtitle1 text-weight-light">
                {{ residente.nombre_carrera }}
              </div>
            </div>

            <div class="col-auto">
              <div class="text-weight-medium">Domicilio:</div>
              <div class="text-subtitle1 text-weight-light">
                {{ residente.domicilio_estudiante }}
              </div>
            </div>

            <div class="col-auto">
              <div class="text-weight-medium">E-mail:</div>
              <div class="text-subtitle1 text-weight-light">
                {{ residente.email }}
              </div>
            </div>

            <div class="col-auto">
              <div class="text-weight-medium">
                Para seguridad social acudir:
              </div>
              <div class="text-subtitle1 text-weight-light">
                {{ residente.seguridad_social }}
              </div>
            </div>

            <div class="col-auto">
              <div class="text-weight-medium">Número de seguridad social:</div>
              <div class="text-subtitle1 text-weight-light">
                {{ residente.no_seguridad_social }}
              </div>
            </div>

            <div class="col-auto">
              <div class="text-weight-medium">Ciudad:</div>
              <div class="text-subtitle1 text-weight-light">
                {{ residente.ciudad_estudiante }}
              </div>
            </div>

            <div class="col-auto">
              <div class="text-weight-medium">Teléfono:</div>
              <div class="text-subtitle1 text-weight-light">
                {{ residente.telefono_estudiante }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-separator color="orange" />
      <div class="fontsize-14 text-weight-light q-mb-xs">
        Datos de la empresa
      </div>

      <div class="row wrap justify-start items-start content-start q-gutter-md">
        <div class="col-auto">
          <div class="text-weight-medium">Nombre:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.nombre }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Giro, ramo o sector:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.giro }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">RFC:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.rfc }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Domicilio:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.domicilio }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Colonia:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.colonia }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">C.P.:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.cp }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Ciudad:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.ciudad }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Telefono:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.telefono }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Misión de la empresa:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.mision }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Titular de la empresa:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.titular }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">
            Puesto del titular de la empresa:
          </div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.titular_puesto }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Nombre de la asesoría externa:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.asesor_externo }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">Puesto de la asesoría externa:</div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.asesor_externo_puesto }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">
            Nombre de la persona que firmará:
          </div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.nombre_firmara }}
          </div>
        </div>

        <div class="col-auto">
          <div class="text-weight-medium">
            Puesto de la persona que firmará:
          </div>
          <div class="text-subtitle1 text-weight-light">
            {{ residente.nombre_firmara_puesto }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.text-data {
  font-size: larger;
}
</style>
