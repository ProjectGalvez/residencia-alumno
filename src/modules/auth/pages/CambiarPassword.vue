<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import {
  ServerValidationError,
  generateErrorMessages,
} from 'src/shared/helpers/errorUtils';
import useEditarPassword from '../composables/useEditarPassword';

const user = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const { actalizarPassword, isLoadingPassword, errorServer } =
  useEditarPassword();
const errorServerValue = errorServer.value as ServerValidationError | null;
const errorMessages = computed(() => {
  return generateErrorMessages(
    errorServer.value as ServerValidationError | null
  );
});
const actualizar = () => {
  const data = new FormData();
  data.append('current_password', user.value.current_password);
  data.append('password', user.value.password);
  data.append('password_confirmation', user.value.password_confirmation);
  actalizarPassword(data);
};
</script>
<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-8 col-sm-10 col-xs-12 q-pa-lg">
        <q-card>
          <q-card-section> Cambiar contraseña </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="actualizar">
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
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="user.current_password"
                  label-slot
                  :rules="[
                    (val) => !!val || 'La contraseña actual es requerida',
                    (value) =>
                      (value.length > 3 && value.length < 255) ||
                      'Debe tener más de 3 caracteres y menos de 255',
                  ]"
                  type="password"
                >
                  <template v-slot:label>
                    Contraseña actual <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="user.password"
                  label-slot
                  :rules="[
                    (val) => !!val || 'La nueva contraseña es requerida',
                    (value) =>
                      (value.length > 5 && value.length < 255) ||
                      'Debe tener más de 5 caracteres y menos de 255',
                  ]"
                  type="password"
                >
                  <template v-slot:label>
                    Nueva contraseña <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="user.password_confirmation"
                  label-slot
                  :rules="[
                    (val) =>
                      !!val || 'La confirmación de contraseña es requerida',
                    (value) =>
                      (value.length > 5 && value.length < 255) ||
                      'Debe tener más de 5 caracteres y menos de 255',
                  ]"
                  type="password"
                >
                  <template v-slot:label>
                    Confirmar contraseña <span class="required-star">*</span>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-7">
                <q-btn
                  label="Cambiar contraseña"
                  color="primary"
                  type="submit"
                  :loading="isLoadingPassword"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
