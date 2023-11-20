<script setup lang="ts">
import { toRef, computed } from 'vue';
import { date } from 'quasar';
import { Documento } from 'src/modules/model/Model';

const props = defineProps<{ documento: Documento }>();
const documento = toRef(props, 'documento');

const isPdf = computed(() => {
  if (!documento.value || !documento.value.url_formato) return false;
  const extension = documento.value.url_formato.split('.').pop();
  return ['pdf'].includes(extension.toLowerCase());
});

const isWord = computed(() => {
  if (!documento.value || !documento.value.url_formato) return false;
  const extension = documento.value.url_formato.split('.').pop();
  return ['doc', 'docx'].includes(extension.toLowerCase());
});

const isImage = computed(() => {
  if (!documento.value || !documento.value.url_formato) return false;
  const extension = documento.value.url_formato.split('.').pop();
  return ['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase());
});
</script>
<template>
  <q-card>
    <q-card-section>
      <div class="fontsize-14 text-center text-weight-light flex items-center">
        <q-icon name="description" class="q-mr-xs" />
        {{ documento.nombre_documento }}
      </div>
    </q-card-section>
    <q-card-section>
      <table>
        <tr>
          <td>Abreviación del nombre del documento:</td>
          <td>{{ documento.abrev_nombre }}</td>
        </tr>
        <tr>
          <td>Fecha límite de entrega:</td>
          <td>
            {{ date.formatDate(documento.fecha_limite || '', 'DD/MM/YYYY') }}
          </td>
        </tr>
        <tr>
          <td>Formato:</td>
          <td>
            <span>
              <q-icon
                v-if="isPdf"
                size="2rem"
                color="red"
                name="picture_as_pdf"
              />
              <q-icon
                v-else-if="isWord"
                size="2rem"
                color="blue"
                name="description"
              />
              <q-icon v-else-if="isImage" size="2rem" name="image" />
              <a
                v-if="documento.url_formato"
                :href="documento.url_formato"
                download
              >
                Descargar
              </a>
            </span>
          </td>
        </tr>
        <tr>
          <td>Entregado por estudiante:</td>
          <td>
            <div v-if="documento.entrega_estudiante">
              Entregado por el estudiante
            </div>
            <div v-else>Generado por algún departamento</div>
          </td>
        </tr>
        <tr>
          <td>Descripción:</td>
          <td>
            <q-card flat bordered>
              <q-card-section>
                <div v-html="documento.descripcion"></div>
              </q-card-section>
            </q-card>
          </td>
        </tr>
        <tr>
          <td>Fecha registro:</td>
          <td>{{ date.formatDate(documento.created_at, 'DD/MM/YYYY') }}</td>
        </tr>
        <tr>
          <td>Última actualización:</td>
          <td>{{ date.formatDate(documento.updated_at, 'DD/MM/YYYY') }}</td>
        </tr>
      </table>
    </q-card-section>
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
