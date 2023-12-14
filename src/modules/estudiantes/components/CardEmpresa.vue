<script setup lang="ts">
import LoaderSpinner from '../../../shared/components/LoaderSpinner.vue';
import documentosApi from 'src/api/documentosApi';
import { Empresa } from 'src/modules/model/Model';
import { ref } from 'vue';
const props = defineProps<{ id: string }>();
const empresa = ref<Empresa>();
const loading = ref(false);
const getEmpresa = async () => {
  loading.value = true;
  const { data } = await documentosApi.get<Empresa>(
    '/estudiante-empresas/' + props.id
  );
  empresa.value = data;
  loading.value = false;
};
getEmpresa();
</script>
<template>
  <div>
    <LoaderSpinner v-if="loading" />
    <q-card v-else-if="empresa">
      <q-card-section>
        <div
          class="fontsize-13 text-center text-weight-light flex items-center"
        >
          <q-icon name="domain" class="q-mr-xs" />
          Empresa en la que realiza su residencia
        </div>
      </q-card-section>
      <q-card-section>
        <table>
          <tr>
            <td>Nombre:</td>
            <td>{{ empresa.nombre_empresa }}</td>
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
</template>
<style scoped>
table tr td:nth-child(2) {
  font-weight: bold;
}
</style>
