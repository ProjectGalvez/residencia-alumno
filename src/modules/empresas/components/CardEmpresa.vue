<script setup lang="ts">
import BotonNuevaArea from './BotonNuevaArea.vue';
import TablaAreas from './TablaAreas.vue';
import { toRef } from 'vue';
import { Empresa } from 'src/modules/model/Model';

const props = defineProps<{ empresa: Empresa }>();
const empresa = toRef(props, 'empresa');
</script>

<template>
  <q-card>
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="date_range" class="q-mr-xs" />
            {{ empresa.nombre }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex justify-star items-center">
            <table>
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
          </div>
        </q-card-section>
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="date_range" class="q-mr-xs" />
            Áreas de la empresa
          </div>
          <div>
            <div class="col-xs-12 col-sm-12">
              <BotonNuevaArea :empresa_id="empresa.id" />
            </div>

            <div class="col-xs-12 col-sm-12">
              <TablaAreas :empresa_id="empresa.id" />
            </div>
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
