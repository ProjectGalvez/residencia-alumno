<script setup lang="ts">
import { toRef, computed } from 'vue';
import { date } from 'quasar';
import { Entrega } from 'src/modules/model/Model';

const props = defineProps<{ entrega: Entrega }>();
const entrega = toRef(props, 'entrega');

const isPdf = computed(() => {
  if (!entrega.value || !entrega.value.url_documento) return false;
  const extension = entrega.value.url_documento.split('.').pop();
  return ['pdf'].includes(extension.toLowerCase());
});

const isWord = computed(() => {
  if (!entrega.value || !entrega.value.url_documento) return false;
  const extension = entrega.value.url_documento.split('.').pop();
  return ['doc', 'docx'].includes(extension.toLowerCase());
});
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="fontsize-14 text-center text-weight-light flex items-center">
        <q-icon name="description" class="q-mr-xs" />
        {{ entrega.documento?.nombre_documento }}
      </div>
    </q-card-section>
    <q-card-section>
      <table>
        <tr>
          <td>Residente:</td>
          <td>
            {{ entrega.estudiante?.nombre }} {{ entrega.estudiante?.apellidos }}
          </td>
        </tr>

        <tr>
          <td>Documento:</td>
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
              <a
                v-if="entrega.url_documento"
                :href="entrega.url_documento"
                download
              >
                Descargar
              </a>
            </span>
          </td>
        </tr>

        <tr>
          <td>Fecha de entrega:</td>
          <td>{{ entrega.fecha_entrega }}</td>
        </tr>
        <tr>
          <td>
            Cumplimiento <small>(fecha de entrega - fecha límite):</small>
          </td>
          <td>
            {{
              date.getDateDiff(
                entrega.fecha_entrega || '',
                entrega.documento?.fecha_limite || '',
                'days'
              )
            }}
            días
          </td>
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
