<script setup lang="ts">
import { toRef, ref } from 'vue';
import FormArea from './FormArea.vue';
import { Area } from 'src/modules/model/Model';
import documentosApi from 'src/api/documentosApi';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import { ServerValidationError } from 'src/shared/helpers/errorUtils';

const props = defineProps<{
  empresa_id: string;
}>();
const empresa_id = toRef(props, 'empresa_id');
const modal = ref(false);

const area = ref<Area>({
  id: 0,
  empresa_id: empresa_id.value,
  nombre: '',
  asesor_externo: '',
  asesor_externo_puesto: '',
  nombre_firmara: '',
  nombre_firmara_puesto: '',
});

const guardarArea = async (area: Area) => {
  try {
    const { data } = await documentosApi.post<Area>('/areas', area);
    return data;
  } catch (error) {
    throw error;
  }
};
const queryClient = useQueryClient();
const errorServer = ref<ServerValidationError | unknown | null>(null);
const { mutate, isLoading } = useMutation(guardarArea, {
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['areas'],
      exact: false,
    });
    modal.value = false;
  },
  onError: (err: AxiosError) => {
    if (err.response) errorServer.value = err.response?.data;
    else errorServer.value = err;
  },
});
</script>

<template>
  <q-btn
    label="Nueva área en esta empresa"
    color="primary"
    @click="modal = true"
  />
  <q-dialog v-model="modal">
    <q-card>
      <FormArea
        :area="area"
        :loading="isLoading"
        :errorServer="errorServer"
        @guardar="mutate"
      />
      <q-card-section>
        <q-btn label="Cancelar" color="negative" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
