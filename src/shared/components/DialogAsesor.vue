<script setup lang="ts">
import documentosApi from 'src/api/documentosApi';
import { Asesor } from 'src/modules/model/Model';
import { computed, ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import { ServerValidationError } from '../helpers/errorUtils';
import FormAsesorDialog from '../forms/FormAsesorDialog.vue';

interface Props {
  modelValue: boolean;
}

const asesor = ref<Asesor>({
  id: 0,
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  titulo: '',
});

const createAsesor = async (asesor: Asesor) => {
  try {
    const { data: responseData } = await documentosApi.post<Asesor>(
      '/asesores',
      asesor
    );
    return responseData;
  } catch (error) {
    throw error;
  }
};
const queryClient = useQueryClient();
const errorServer = ref<ServerValidationError | unknown | null>(null);
const { mutate, isLoading } = useMutation(createAsesor, {
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['asesores'],
      exact: false,
    });
    emit('update:modelValue', false);
    //queryClient.setQueryData([endpoint.replace(/^\//, '')], resource);
  },
  onError: (err: AxiosError) => {
    if (err.response) errorServer.value = err.response?.data;
    else errorServer.value = err;
  },
});

const guardar = (asesor: Asesor) => {
  mutate(asesor);
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:modelValue', newValue: boolean): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emit('update:modelValue', newValue),
});
</script>
<template>
  <q-dialog v-model="model">
    <q-card>
      <FormAsesorDialog
        :asesor="asesor"
        :loading="isLoading"
        :errorServer="errorServer"
        @guardar="guardar"
      />
      <q-card-section>
        <q-btn label="Cancelar" color="negative" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
