<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import { User } from 'src/modules/model/Model';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';

const props = defineProps<{
  user: User;
  loading: boolean;
  errorServer?: ServerValidationError | unknown | null;
}>();

const user = toRef(props, 'user');
const loading = toRef(props, 'loading');
const errorServer = toRef(props, 'errorServer');
const errorServerValue = errorServer.value as ServerValidationError | null;
let imageUrl = ref(user.value.url_foto);
const perfilInput = ref<any>(null);

const emit = defineEmits<{ (event: 'guardar', user: FormData): void }>();
const emitir = () => {
  const saveUser = new FormData();
  saveUser.append('id', user.value.id + '');
  saveUser.append('name', user.value.name);
  saveUser.append('email', user.value.email);
  saveUser.append('password', user.value.password + '');
  saveUser.append('rol', user.value.rol + '');
  if (perfilInput.value) {
    saveUser.append('url_foto', perfilInput.value[0]);
  }
  emit('guardar', saveUser);
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

const roles = [
  {
    id: 'admin',
    nombre: 'admin',
  },
  { id: 'capturista', nombre: 'capturista' },
];
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

          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="user.name"
              label-slot
              :rules="[
                (val) => !!val || 'El nombre del usuario es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Nombre completo del usuario <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="user.email"
              label-slot
              :rules="[
                (val) => !!val || 'El correo es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Correo electrónico <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="user.password"
              label-slot
              type="password"
              :rules="[
                (val) => !!val || 'La contraseña es requerido',
                (value) =>
                  (value.length > 3 && value.length < 255) ||
                  'Debe tener más de 3 caracteres y menos de 255',
              ]"
            >
              <template v-slot:label>
                Contraseña <span class="required-star">*</span>
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.rol"
              :options="roles"
              label-slot
              option-value="id"
              option-label="nombre"
              emit-value
              map-options
              :rules="[(val) => !!val || 'Selecciona un rol']"
            >
              <template v-slot:label>
                Selecciona rol <span class="required-star">*</span>
              </template>
            </q-select>
          </div>

          <div class="col-xs-12 col-sm-4">
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
              <q-img :src="imageUrl" alt="Perfil" />
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
