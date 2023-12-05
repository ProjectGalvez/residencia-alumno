<script setup lang="ts">
import documentosApi from 'src/api/documentosApi';
import FormProyectoDialog from '../forms/FormProyectoDialog.vue';
import { Proyecto } from 'src/modules/model/Model';
import { computed, ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import { ServerValidationError } from '../helpers/errorUtils';

interface Props {
  modelValue: boolean;
}

const proyecto = ref<Proyecto>({
  id: 0,
  nombre: '',
  tipo: '',
  carrera_id: null,
});

const createProyecto = async (proyecto: Proyecto) => {
  try {
    const { data: responseData } = await documentosApi.post<Proyecto>(
      '/proyectos',
      proyecto
    );
    return responseData;
  } catch (error) {
    throw error;
  }
};
const queryClient = useQueryClient();
const errorServer = ref<ServerValidationError | unknown | null>(null);
const { mutate, isLoading } = useMutation(createProyecto, {
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['proyectos'],
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

const guardar = (proyecto: Proyecto) => {
  mutate(proyecto);
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
      <FormProyectoDialog
        :proyecto="proyecto"
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
