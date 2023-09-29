<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import { Carrera } from 'src/modules/model/Model';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import useObtenerDepartamentos from 'src/modules/departamentos/composables/useObtenerDepartamentos';

const props = defineProps<{
  carrera: Carrera;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const { data: departamentos } = useObtenerDepartamentos();

const carrera = toRef(props, 'carrera');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;
let imageUrl = ref(carrera.value.escudo);
const escudoInput = ref<any>(null);

const emit = defineEmits<{ (event: 'guardar', carrera: FormData): void }>();
const emitir = () => {
  const saveCarrera = new FormData();
  saveCarrera.append('id', carrera.value.id + '');
  saveCarrera.append('nombre', carrera.value.nombre);
  saveCarrera.append('clave', carrera.value.clave);
  saveCarrera.append('departamento_id', carrera.value.departamento_id + '');
  if (escudoInput.value) {
    saveCarrera.append('escudo', escudoInput.value[0]);
  }
  emit('guardar', saveCarrera);
};

const errorMessages = computed(() => {
  return generateErrorMessages(
    errorServer.value as ServerValidationError | null
  );
});

const previewImage = () => {
  if (escudoInput.value) {
    imageUrl.value = URL.createObjectURL(escudoInput.value[0]);
  }
};

const closeImg = () => {
  imageUrl.value = '';
  escudoInput.value = null;
};
const handleFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const image = fileInput.files?.[0] || null;
  escudoInput.value = fileInput.files?.[0] || null;
  if (image) {
    imageUrl.value = URL.createObjectURL(image);
  }
};
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="fontsize-15 text-weight-light">Introduce los datos</div>
    </q-card-section>
    <q-form @submit.prevent="emitir">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-banner
              v-if="errorServer"
              inline-actions
              class="text-white bg-red"
            >
              {{ errorServerValue?.message || '' }}
              <ul>
                <li v-for="error in errorMessages" :key="error">{{ error }}</li>
              </ul>
            </q-banner>
          </div>

          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="carrera.nombre"
              label-slot
              :rules="[
                (val) => !!val || 'El nombre de la carrera es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Nombre de la carrera <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="carrera.clave"
              label-slot
              :rules="[
                (val) => !!val || 'La clave de la carrera es requerido',
                (value) =>
                  (value.length > 3 && value.length < 50) ||
                  'Debe tener más de 2 caracteres y menos de 50',
              ]"
            >
              <template v-slot:label>
                Clave de la carrera <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="carrera.departamento_id"
              :options="departamentos"
              label-slot
              option-value="id"
              option-label="nombre"
              emit-value
              map-options
              :rules="[(val) => !!val || 'Selecciona un departamento']"
            >
              <template v-slot:label>
                Selecciona un departamento <span class="required-star">*</span>
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-file
              bottom-slots
              v-model="escudoInput"
              label-slot
              counter
              multiple
              accept=".jpg, image/*"
              @update:model-value="previewImage"
              @change="handleFileChange"
            >
              <template v-slot:label> Escudo: </template>

              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>

              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="closeImg"
                  class="cursor-pointer"
                />
              </template>
            </q-file>

            <div>
              <q-img :src="imageUrl" alt="Escudo" />
            </div>
          </div>

          <div class="col-xs-12 col-sm-7">
            <q-btn
              label="Guardar"
              color="primary"
              type="submit"
              :loading="loading"
            />
          </div>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<style scoped></style>
