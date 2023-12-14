<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import { Estudiante } from 'src/modules/model/Model';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import useObtenerCarreras from 'src/modules/carreras/composables/useObtenerCarreras';

const props = defineProps<{
  estudiante: Estudiante;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const { data: carreras } = useObtenerCarreras();

const estudiante = toRef(props, 'estudiante');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;
const perfilInput = ref<any>(null);
let imageUrl = ref(estudiante.value.user?.url_foto || null);

const emit = defineEmits<{
  (event: 'guardar', estudiante: FormData): void;
}>();
const emitir = () => {
  const estudianteForm = new FormData();
  estudianteForm.append('id', estudiante.value.id);
  estudianteForm.append('nombre', estudiante.value.nombre);
  estudianteForm.append('apellidos', estudiante.value.apellidos);
  estudianteForm.append('numero_control', estudiante.value.numero_control);
  estudianteForm.append('telefono', estudiante.value.telefono + '');
  estudianteForm.append('email', estudiante.value.email);
  estudianteForm.append('carrera_id', estudiante.value.carrera_id + '');
  estudianteForm.append(
    'seguridad_social',
    estudiante.value.seguridad_social + ''
  );
  estudianteForm.append(
    'no_seguridad_social',
    estudiante.value.no_seguridad_social + ''
  );
  estudianteForm.append('domicilio', estudiante.value.domicilio + '');
  estudianteForm.append('genero', estudiante.value.genero + '');
  estudianteForm.append('password', estudiante.value.password + '');
  if (perfilInput.value != null) {
    estudianteForm.append('url_foto', perfilInput.value[0]);
  }

  emit('guardar', estudianteForm);
};
const errorMessages = computed(() => {
  return generateErrorMessages(
    errorServer.value as ServerValidationError | null
  );
});

const previewImage = () => {
  if (perfilInput.value) {
    imageUrl.value = URL.createObjectURL(perfilInput.value[0]);
  }
};

const closeImg = () => {
  imageUrl.value = '';
  perfilInput.value = null;
};

const handleFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const image = fileInput.files?.[0] || null;
  perfilInput.value = fileInput.files?.[0] || null;
  if (image) {
    imageUrl.value = URL.createObjectURL(image);
  }
};

const options = [
  { id: 'M', name: 'Masculino' },
  { id: 'F', name: 'Femenino' },
  { id: 'X', name: 'No binario' },
];
const seguridadSocial = ['IMSS', 'ISSSTE', 'OTROS'];
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="fontsize-15 text-weight-light">Introduce los datos</div>
    </q-card-section>
    <q-form @submit.prevent="emitir">
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-sm-8">
            <!-- Form -->
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-banner
                  v-if="errorServer"
                  inline-actions
                  class="text-white bg-red"
                >
                  {{ errorServerValue?.message || '' }}
                  <ul>
                    <li v-for="error in errorMessages" :key="error">
                      {{ error }}
                    </li>
                  </ul>
                </q-banner>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="estudiante.nombre"
                  label-slot
                  :rules="[
                    (val) => !!val || 'El nombre del estudiante es requerido',
                    (value) =>
                      (value.length > 3 && value.length < 255) ||
                      'Debe tener más de 3 caracteres y menos de 255',
                  ]"
                >
                  <template v-slot:label>
                    Nombre(s): <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="estudiante.apellidos"
                  label-slot
                  :rules="[
                    (val) => !!val || 'El nombre del estudiante es requerido',
                    (value) =>
                      (value.length > 3 && value.length < 255) ||
                      'Debe tener más de 3 caracteres y menos de 255',
                  ]"
                >
                  <template v-slot:label>
                    Apellidos: <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="estudiante.numero_control"
                  label-slot
                  :rules="[
                    (val) => !!val || 'El número de control es requerido',
                    (value) =>
                      (value.length > 3 && value.length < 255) ||
                      'Debe tener más de 3 caracteres y menos de 255',
                  ]"
                >
                  <template v-slot:label>
                    Número de control: <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-select
                  v-model="estudiante.carrera_id"
                  :options="carreras"
                  label-slot
                  option-value="id"
                  option-label="nombre"
                  emit-value
                  map-options
                  :rules="[(val) => !!val || 'Selecciona una carrera']"
                >
                  <template v-slot:label>
                    Carrera <span class="required-star">*</span>
                  </template>
                </q-select>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="estudiante.telefono"
                  label-slot
                  mask="(###) ### - ####"
                >
                  <template v-slot:label> Teléfono: </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="estudiante.email"
                  label-slot
                  :rules="[
                    (val) => !!val || 'El correo es requerido',
                    (value) =>
                      (value.length > 3 && value.length < 255) ||
                      'Debe tener más de 3 caracteres y menos de 255',
                  ]"
                >
                  <template v-slot:label>
                    Correo electrónico: <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-select
                  v-model="estudiante.seguridad_social"
                  :options="seguridadSocial"
                  label="Seguridad social:"
                  emit-value
                  map-options
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input v-model="estudiante.no_seguridad_social" label-slot>
                  <template v-slot:label>
                    Número de seguridad social:
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input v-model="estudiante.domicilio" label-slot>
                  <template v-slot:label> Domicilio: </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input v-model="estudiante.ciudad" label-slot>
                  <template v-slot:label> Ciudad: </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-6">
                <q-select
                  v-model="estudiante.genero"
                  :options="options"
                  label="Género"
                  option-value="id"
                  option-label="name"
                  emit-value
                  map-options
                />
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
          </div>
          <div class="col-xs-12 col-sm-4 q-pl-md">
            <!-- Datos user -->
            <div class="text-subtitle1">Datos de usuario del estudiante:</div>
            <div class="text-weight-medium">Nombre:</div>
            <div class="text-weight-light text-subtitle1">
              {{ estudiante.nombre }} {{ estudiante.apellidos }}
            </div>
            <div class="text-weight-medium">Correo:</div>
            <div class="text-weight-light text-subtitle1">
              {{ estudiante.email }}
            </div>

            <div>
              <q-input
                v-model="estudiante.password"
                hint="Si no coloca la contraseña, esta sera password"
                label-slot
              >
                <template v-slot:label> Contraseña: </template>
              </q-input>
            </div>
            <div>
              <q-file
                bottom-slots
                v-model="perfilInput"
                label-slot
                counter
                multiple
                accept=".jpg, image/*"
                @update:model-value="previewImage"
                @change="handleFileChange"
              >
                <template v-slot:label> Imagen de perfil: </template>

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
                <q-img v-if="imageUrl" :src="imageUrl" alt="Perfil" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<style scoped></style>
